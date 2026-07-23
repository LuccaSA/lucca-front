/**
 * Extraction front-end for the LLM/API documentation surface of `@lucca-front/ng`,
 * driven by the TypeScript compiler API (via ts-morph — bundling the same TS the
 * repo compiles with). It resolves each secondary entry-point's public surface from
 * the type system rather than a regex over the barrel, so `export *` re-exports are
 * included, and it reads type parameters, deprecation, visibility and signatures
 * from the AST — no `modifierKind` magic numbers, no `@deprecated`-as-string-terminator.
 *
 * This replaces the Compodoc `documentation.json` extraction of the earlier attempt:
 * ts-morph reads Angular signal `input()`/`output()`/`model()` straight from source,
 * so the surface no longer depends on Compodoc's renderer resolving them.
 *
 * Output is a compodoc-shaped `doc` object so the renderers and coverage report in
 * `generate-llms.mjs` consume it unchanged. Extraction is purely syntactic (AST +
 * JSDoc) wherever possible, which keeps it deterministic: the same source in yields
 * the same `doc` out.
 *
 * @see generate-llms.mjs (the renderer/determinism contract this feeds)
 */
import { resolve } from 'node:path';

import { Node, Project } from 'ts-morph';

/**
 * A normalised documentation entity. Fields are a superset across kinds; a given
 * kind only populates the ones its renderer reads (see `generate-llms.mjs`).
 * @typedef {Object} ApiEntity
 * @property {string} name — the public export name (aliases resolved to the alias)
 * @property {string} [rawdescription] — JSDoc description, tags excluded
 * @property {boolean} [deprecated]
 * @property {string} [deprecationMessage]
 * @property {string[]} [typeParameters]
 * @property {string} [selector]
 * @property {any[]} [inputsClass]
 * @property {any[]} [outputsClass]
 * @property {any[]} [methodsClass]
 * @property {any[]} [args]
 * @property {string} [returnType]
 * @property {any[]} [signatures] — per-overload `{ typeParameters, args, returnType }` for functions
 * @property {any[]} [properties]
 * @property {string} [rawtype]
 * @property {any[]} [members]
 * @property {string} [type]
 *
 * @typedef {Object} ApiDoc — compodoc-shaped extraction consumed by the renderers.
 * @property {ApiEntity[]} components
 * @property {ApiEntity[]} directives
 * @property {ApiEntity[]} injectables
 * @property {ApiEntity[]} interfaces
 * @property {ApiEntity[]} classes
 * @property {{ functions: ApiEntity[], typealiases: ApiEntity[], enumerations: ApiEntity[], variables: ApiEntity[] }} miscellaneous
 */

/** Angular signal-input factories whose call expression declares a component input. */
const INPUT_CALLEES = new Set(['input', 'input.required', 'model', 'model.required']);

/** JSDoc nodes attached to a declaration (variable JSDoc lives on the statement). */
function jsDocsOf(node) {
	const holder = Node.isVariableDeclaration(node) ? node.getVariableStatement() : node;
	return holder && typeof holder.getJsDocs === 'function' ? holder.getJsDocs() : [];
}

/** JSDoc description (text before the first block tag), trimmed. */
function descriptionOf(node) {
	const docs = jsDocsOf(node);
	return docs.length ? docs[docs.length - 1].getDescription().trim() : '';
}

/** First `@deprecated` tag across a set of declarations (covers overload signatures). */
function firstDeprecation(declarations) {
	for (const decl of declarations) {
		for (const doc of jsDocsOf(decl)) {
			for (const tag of doc.getTags()) {
				if (tag.getTagName() === 'deprecated') return { deprecated: true, message: (tag.getCommentText() ?? '').trim() };
			}
		}
	}
	return { deprecated: false, message: '' };
}

/**
 * Deprecation fields for a single member (input/output/method/property), spread into
 * the member object only when present so undeprecated members stay clean. A deprecated
 * input is common in a design system, so members carry their own deprecation, not just
 * the owning entity.
 * @param {import('ts-morph').Node} node
 */
function memberDeprecation(node) {
	const { deprecated, message } = firstDeprecation([node]);
	return deprecated ? { deprecated, deprecationMessage: message } : {};
}

/** Type-parameter texts (`['TId']`, `['T', 'K extends string']`) or `[]`. */
function typeParamsOf(node) {
	return typeof node.getTypeParameters === 'function' ? node.getTypeParameters().map((tp) => tp.getText()) : [];
}

/** Resolved type text, guarded — falls back to `undefined` if the checker throws. */
function safeTypeText(type, enclosing) {
	try {
		return type.getText(enclosing);
	} catch {
		return undefined;
	}
}

/**
 * Presentation-ready type text for a code fence: strip JSDoc blocks leaked from
 * object-literal member docs, drop `import("pkg").` qualifiers the checker emits
 * for non-imported symbols, and collapse to a single line. Idempotent, so already
 * clean AST type text passes through unchanged. Returns `undefined` for empty input
 * so callers can `?? 'unknown'`.
 * @param {string | undefined} text
 */
function normalizeType(text) {
	if (!text) return undefined;
	return text
		.replace(/\/\*\*[\s\S]*?\*\//g, '')
		.replace(/import\((?:"[^"]*"|'[^']*')\)\./g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/** Classify a declaration into a renderer bucket, or `null` when unsupported. */
function classify(node) {
	if (Node.isClassDeclaration(node)) {
		if (node.getDecorator('Component')) return 'component';
		if (node.getDecorator('Directive')) return 'directive';
		if (node.getDecorator('Injectable') || node.getDecorator('Pipe')) return 'injectable';
		return 'class';
	}
	if (Node.isFunctionDeclaration(node)) return 'function';
	if (Node.isInterfaceDeclaration(node)) return 'interface';
	if (Node.isTypeAliasDeclaration(node)) return 'typealias';
	if (Node.isEnumDeclaration(node)) return 'enumeration';
	if (Node.isVariableDeclaration(node)) return 'variable';
	return null;
}

/** `selector` string from a `@Component`/`@Directive` decorator, or `undefined`. */
function selectorOf(classNode) {
	const decorator = classNode.getDecorator('Component') ?? classNode.getDecorator('Directive');
	const arg = decorator?.getArguments()[0];
	if (arg && Node.isObjectLiteralExpression(arg)) {
		const prop = arg.getProperty('selector');
		const init = prop && Node.isPropertyAssignment(prop) ? prop.getInitializer() : undefined;
		if (init && Node.isStringLiteral(init)) return init.getLiteralValue();
	}
	return undefined;
}

/** Read type of a signal input from its declared type: `input<T>()` → `T`, else the checker. */
function signalReadType(prop) {
	const args = safeTypeArguments(prop);
	return args.length ? safeTypeText(args[0], prop) : undefined;
}
function safeTypeArguments(prop) {
	try {
		return prop.getType().getTypeArguments();
	} catch {
		return [];
	}
}

/** Component/directive inputs and outputs from Angular signal factories. */
function membersOf(classNode) {
	const inputsClass = [];
	const outputsClass = [];
	for (const prop of classNode.getProperties()) {
		const init = prop.getInitializer();
		if (!init || !Node.isCallExpression(init)) continue;
		const callee = init.getExpression().getText();
		const writtenType = init.getTypeArguments()[0]?.getText();
		const rawdescription = descriptionOf(prop);
		if (INPUT_CALLEES.has(callee)) {
			const required = callee.endsWith('.required');
			const initArgs = init.getArguments();
			inputsClass.push({
				name: prop.getName(),
				type: normalizeType(writtenType ?? signalReadType(prop)) ?? 'unknown',
				defaultValue: !required && initArgs.length ? initArgs[0].getText() : undefined,
				required,
				rawdescription,
				...memberDeprecation(prop),
			});
		} else if (callee === 'output') {
			outputsClass.push({
				name: prop.getName(),
				type: normalizeType(writtenType) ?? 'void',
				rawdescription,
				...memberDeprecation(prop),
			});
		}
	}
	return { inputsClass, outputsClass };
}

/** Public, non-static, non-#-private instance methods (lifecycle filtering stays in the renderer). */
function methodsOf(classNode) {
	const methods = [];
	for (const method of classNode.getMethods()) {
		if (method.isStatic() || method.getName().startsWith('#') || method.getScope() !== 'public') continue;
		methods.push({
			name: method.getName(),
			args: paramsOf(method),
			returnType: normalizeType(method.getReturnTypeNode()?.getText() ?? safeTypeText(method.getReturnType(), method)) ?? 'void',
			rawdescription: descriptionOf(method),
			...memberDeprecation(method),
		});
	}
	return methods;
}

/**
 * Parameter `{ name, type }` list, preferring the written type node. Markers that
 * change the call contract are kept in the name: a rest parameter is `...name`
 * (variadic, never optional), and a parameter with a `?` token or a default value
 * is `name?` — otherwise a defaulted parameter would read as required.
 */
function paramsOf(node) {
	return node.getParameters().map((param) => {
		const rest = param.isRestParameter();
		const optional = !rest && (param.hasQuestionToken() || param.hasInitializer());
		const base = param.getName();
		return {
			name: rest ? `...${base}` : optional ? `${base}?` : base,
			type: normalizeType(param.getTypeNode()?.getText() ?? safeTypeText(param.getType(), param)) ?? 'unknown',
		};
	});
}

/**
 * Every public signature of a function: its overload declarations, or the single
 * implementation when there are none. A function's public API is its overloads —
 * keeping only one would drop the others (e.g. a custom-key form).
 */
function signaturesOf(declarations) {
	const overloads = declarations.filter((decl) => Node.isFunctionDeclaration(decl) && !decl.getBody());
	const sigNodes = overloads.length ? overloads : declarations;
	return sigNodes.map((node) => ({
		typeParameters: typeParamsOf(node),
		args: paramsOf(node),
		returnType: normalizeType(node.getReturnTypeNode()?.getText() ?? safeTypeText(node.getReturnType(), node)) ?? 'void',
	}));
}

/** Interface property `{ name, type, optional, readonly, rawdescription }` list. */
function propertiesOf(interfaceNode) {
	return interfaceNode.getProperties().map((prop) => ({
		name: prop.getName(),
		type: normalizeType(prop.getTypeNode()?.getText()) ?? 'unknown',
		optional: prop.hasQuestionToken(),
		readonly: prop.isReadonly(),
		rawdescription: descriptionOf(prop),
		...memberDeprecation(prop),
	}));
}

/** Variable type: written annotation → reconstructed `new X<T>()` → resolved type. */
function variableType(varDecl) {
	const written = varDecl.getTypeNode()?.getText();
	if (written) return normalizeType(written) ?? 'unknown';
	const init = varDecl.getInitializer();
	if (init && Node.isNewExpression(init)) {
		const callee = init.getExpression().getText();
		const typeArgs = init.getTypeArguments().map((t) => t.getText());
		return normalizeType(typeArgs.length ? `${callee}<${typeArgs.join(', ')}>` : callee) ?? 'unknown';
	}
	return normalizeType(safeTypeText(varDecl.getType(), varDecl)) ?? 'unknown';
}

/** Build the normalised entity for one export name and its resolved declaration. */
function buildEntity(name, kind, node, declarations) {
	const { deprecated, message } = firstDeprecation(declarations);
	const base = {
		name,
		rawdescription: descriptionOf(node),
		deprecated,
		deprecationMessage: message,
		typeParameters: typeParamsOf(node),
	};
	switch (kind) {
		case 'component':
		case 'directive':
		case 'injectable':
		case 'class':
			return { ...base, selector: selectorOf(node), ...membersOf(node), methodsClass: methodsOf(node) };
		case 'function':
			return { ...base, signatures: signaturesOf(declarations) };
		case 'interface':
			return { ...base, properties: propertiesOf(node) };
		case 'typealias':
			return { ...base, rawtype: normalizeType(node.getTypeNode()?.getText()) ?? 'unknown' };
		case 'enumeration':
			return {
				...base,
				members: node.getMembers().map((m) => ({ name: m.getName(), value: m.getValue() })),
			};
		case 'variable':
			return { ...base, type: variableType(node) };
		default:
			return base;
	}
}

/** @param {ApiDoc} doc @param {string} kind */
function bucketFor(doc, kind) {
	switch (kind) {
		case 'component':
			return doc.components;
		case 'directive':
			return doc.directives;
		case 'injectable':
			return doc.injectables;
		case 'interface':
			return doc.interfaces;
		case 'class':
			return doc.classes;
		case 'function':
			return doc.miscellaneous.functions;
		case 'typealias':
			return doc.miscellaneous.typealiases;
		case 'enumeration':
			return doc.miscellaneous.enumerations;
		case 'variable':
			return doc.miscellaneous.variables;
		default:
			return null;
	}
}

/** An empty compodoc-shaped `doc`. */
export function emptyDoc() {
	return {
		components: [],
		directives: [],
		injectables: [],
		interfaces: [],
		classes: [],
		miscellaneous: { functions: [], typealiases: [], enumerations: [], variables: [] },
	};
}

/** Every bucket of a `doc`, as a flat array of arrays (for sorting/merging). */
function allBuckets(doc) {
	return [
		doc.components,
		doc.directives,
		doc.injectables,
		doc.interfaces,
		doc.classes,
		doc.miscellaneous.functions,
		doc.miscellaneous.typealiases,
		doc.miscellaneous.enumerations,
		doc.miscellaneous.variables,
	];
}

/**
 * Extract a compodoc-shaped `doc` and the public-export name set from a barrel
 * source file. `getExportedDeclarations()` resolves the surface through the type
 * system — including `export *` and aliased/type-only re-exports.
 * @param {import('ts-morph').SourceFile} barrelSourceFile
 * @returns {{ doc: ApiDoc, names: Set<string> }}
 */
export function extractDoc(barrelSourceFile) {
	const exported = barrelSourceFile.getExportedDeclarations();
	const doc = emptyDoc();
	for (const [name, declarations] of exported) {
		const node = declarations.find((decl) => descriptionOf(decl)) ?? declarations[0];
		const kind = node && classify(node);
		const bucket = kind && bucketFor(doc, kind);
		if (bucket) bucket.push(buildEntity(name, kind, node, declarations));
	}
	// Alpha-sort each bucket so the extraction is stable regardless of source order.
	for (const bucket of allBuckets(doc)) bucket.sort((a, b) => a.name.localeCompare(b.name));
	return { doc, names: new Set(exported.keys()) };
}

/**
 * Create a ts-morph project from the repo's tsconfig (for module resolution and
 * the type fallback), without eagerly loading the whole program.
 * @param {string} root — workspace root
 */
export function createProject(root) {
	return new Project({
		tsConfigFilePath: resolve(root, 'tsconfig.json'),
		skipAddingFilesFromTsConfig: true,
	});
}

/**
 * Extract one entry point's public API from its barrel, in the given project.
 * @param {import('ts-morph').Project} project
 * @param {string} indexAbsPath — absolute path to the barrel (public-api.ts)
 * @returns {{ doc: ApiDoc, names: Set<string> }}
 */
export function extractLibrary(project, indexAbsPath) {
	const sourceFile = project.getSourceFile(indexAbsPath) ?? project.addSourceFileAtPath(indexAbsPath);
	return extractDoc(sourceFile);
}

/**
 * Extract and MERGE the public API of many barrels into one `doc` + name set — the
 * whole `@lucca-front/ng` surface. A symbol re-exported from several entry points is
 * kept once (first occurrence wins); buckets are re-sorted after the merge so the
 * union is stable regardless of barrel order.
 * @param {import('ts-morph').Project} project
 * @param {string[]} indexAbsPaths — absolute paths to the barrels
 * @returns {{ doc: ApiDoc, names: Set<string> }}
 */
export function extractLibraries(project, indexAbsPaths) {
	const merged = emptyDoc();
	const names = new Set();
	const seen = new Set();
	const mergedBuckets = allBuckets(merged);
	for (const indexAbsPath of indexAbsPaths) {
		const { doc, names: barrelNames } = extractLibrary(project, indexAbsPath);
		const barrelBuckets = allBuckets(doc);
		for (let i = 0; i < mergedBuckets.length; i++) {
			for (const entity of barrelBuckets[i]) {
				if (seen.has(entity.name)) continue;
				seen.add(entity.name);
				mergedBuckets[i].push(entity);
			}
		}
		for (const name of barrelNames) names.add(name);
	}
	for (const bucket of mergedBuckets) bucket.sort((a, b) => a.name.localeCompare(b.name));
	return { doc: merged, names };
}
