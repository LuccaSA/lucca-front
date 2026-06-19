/**
 * AST extractor — extracts Angular component/directive API from source code.
 *
 * Uses regex-based extraction (not ts-morph) because source files are read
 * via `git show <tag>:<path>`, not from the filesystem.
 *
 * Handles both modern signal-based inputs (v21.2+) and decorator-based inputs (v20.x):
 * - `input<Type>()`, `input.required<Type>()`, `input(default, { transform })`
 * - `@Input() prop: Type`, `@Input('alias') prop: Type`
 * - `output<Type>()`, `@Output() prop`
 * - `model<Type>()`, `model.required<Type>()`
 *
 * Resolution strategy (per the rubber-duck critique):
 * 1. Start from `packages/ng/<pkg>/public-api.ts`
 * 2. Follow re-exports to find actual implementation files
 * 3. Extract from each implementation file
 */

import { execSync } from 'child_process';
import path from 'path';
import { ExtractedAPI, ExtractedInput, ExtractedModel, ExtractedOutput, PackageAPI, VersionConfig } from '../types';

const WORKSPACE_ROOT = path.join(__dirname, '..', '..', '..');

/**
 * Extracts the full API for an Angular package from a specific git tag.
 *
 * @param ngPackage — Package name, e.g. "button" (or a secondary entrypoint like "forms/phone-number-input")
 * @param version — Version config (for the git tag)
 * @param silent — Suppress warnings (used during tag-walks where misses are expected)
 * @param selectorFilter — When set, keep only classes whose selector is listed. Scopes one component
 *                          out of a multi-component package (e.g. "lu-text-input" from "forms").
 */
export function extractPackageAPI(ngPackage: string, version: VersionConfig, silent = false, selectorFilter?: string[]): PackageAPI | null {
	// Start from the public API entrypoint
	const publicApiPath = `packages/ng/${ngPackage}/public-api.ts`;
	const publicApiContent = gitShow(version.tag, publicApiPath);

	if (!publicApiContent) {
		if (!silent) console.warn(`  ⚠️  No public-api.ts found for ${ngPackage} at ${version.tag}`);
		return null;
	}

	// Find all implementation files by following re-exports
	const implFiles = resolveImplementationFiles(publicApiContent, ngPackage, version.tag);

	if (implFiles.length === 0) {
		if (!silent) console.warn(`  ⚠️  No implementation files found for ${ngPackage} at ${version.tag}`);
		return null;
	}

	// Extract API from each implementation file
	const apis: ExtractedAPI[] = [];
	for (const filePath of implFiles) {
		const content = gitShow(version.tag, filePath);
		if (!content) continue;

		const extracted = extractFromFile(content, ngPackage, filePath, version.tag);
		apis.push(...extracted);
	}

	let scoped = apis;
	if (selectorFilter && selectorFilter.length > 0) {
		const wanted = new Set(selectorFilter);
		scoped = apis.filter((a) => a.selectors.some((s) => wanted.has(s)));
		if (scoped.length === 0) {
			if (!silent) console.warn(`  ⚠️  selectorFilter [${selectorFilter.join(', ')}] matched no class in ${ngPackage} at ${version.tag}`);
			return null;
		}
	}

	if (scoped.length === 0) return null;

	return { ngPackage, apis: scoped };
}

/**
 * Returns the relative specifiers re-exported by a barrel file, covering both
 * `export * from './x'` and named `export { Foo } from './x'` / `export type { Foo } from './x'`.
 * Only relative paths (./ or ../) are returned; bare and scoped-package specifiers are ignored.
 */
function collectReExportTargets(content: string): string[] {
	const targets: string[] = [];
	const re = /export\s+(?:\*|type\s+\{[^}]*\}|\{[^}]*\})\s+from\s+['"](\.\.?\/[^'"]+)['"]/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(content)) !== null) {
		targets.push(m[1]);
	}
	return targets;
}

/**
 * Resolves a re-export target (path without guaranteed extension) to the actual source file,
 * trying `<base>.ts`, then directory barrels `<base>/index.ts` and `<base>/public-api.ts`.
 * Needed because barrels re-export directories (`export * from './plugins/clear-format'`), not files.
 */
function gitResolveModule(tag: string, base: string): { path: string; content: string } | null {
	const stem = base.replace(/\.ts$/, '');
	for (const cand of [`${stem}.ts`, `${stem}/index.ts`, `${stem}/public-api.ts`]) {
		const content = gitShow(tag, cand);
		if (content) return { path: cand, content };
	}
	return null;
}

/**
 * Follows re-exports to find actual implementation files.
 */
function resolveImplementationFiles(publicApiContent: string, ngPackage: string, tag: string): string[] {
	const files: string[] = [];
	const visited = new Set<string>();

	function resolve(content: string, basePath: string): void {
		// Match: export * from './foo' or export * from '@lucca/prisme/bar'
		const reExportRe = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
		let match: RegExpExecArray | null;

		while ((match = reExportRe.exec(content)) !== null) {
			const importPath = match[1];
			let base: string;

			if (importPath.startsWith('@lucca/prisme/')) {
				// @lucca/prisme/button → packages/prisme/button/public-api.ts
				const subPkg = importPath.replace('@lucca/prisme/', '');
				base = `packages/prisme/${subPkg}/public-api.ts`;
			} else if (importPath.startsWith('./') || importPath.startsWith('../')) {
				// Relative import
				base = path.posix.normalize(`${path.dirname(basePath)}/${importPath}`);
			} else {
				continue;
			}

			const resolved = gitResolveModule(tag, base);
			if (!resolved) continue;
			const resolvedPath = resolved.path;

			if (visited.has(resolvedPath)) continue;
			visited.add(resolvedPath);

			const fileContent = resolved.content;

			// If this file re-exports further, follow it
			if (fileContent.includes('export *')) {
				resolve(fileContent, resolvedPath);
			}

			// Collect all .ts exports (component/directive files), from both wildcard and named
			// re-exports — `export * from './x'` AND `export { Foo } from './x'`. Index barrels mix
			// both styles (e.g. user/picture/index.ts uses named re-exports), so following only
			// wildcards silently drops their components.
			for (const relPath of collectReExportTargets(fileContent)) {
				const dir = path.dirname(resolvedPath);
				let fullPath = path.posix.normalize(`${dir}/${relPath}`);
				if (!fullPath.endsWith('.ts')) fullPath += '.ts';

				if (!visited.has(fullPath)) {
					visited.add(fullPath);
					files.push(fullPath);
				}
			}

			// The file itself may contain component/directive classes
			if (fileContent.includes('@Component') || fileContent.includes('@Directive')) {
				files.push(resolvedPath);
			}
		}

		// Also handle direct exports from the public-api.ts itself (wildcard + named re-exports)
		for (const relPath of collectReExportTargets(content)) {
			const base = path.posix.normalize(`${path.dirname(basePath)}/${relPath}`);
			const resolved = gitResolveModule(tag, base);
			if (!resolved) continue;

			if (!visited.has(resolved.path)) {
				visited.add(resolved.path);
				if (resolved.content.includes('@Component') || resolved.content.includes('@Directive')) {
					files.push(resolved.path);
				}
				if (resolved.content.includes('export *') || /export\s+(?:type\s+)?\{/.test(resolved.content)) {
					resolve(resolved.content, resolved.path);
				}
			}
		}
	}

	resolve(publicApiContent, `packages/ng/${ngPackage}/public-api.ts`);
	return [...new Set(files)];
}

/**
 * Extracts all Angular component/directive APIs from a single .ts file.
 * Resolves imported type aliases by following imports to sibling files.
 */
function extractFromFile(content: string, ngPackage: string, filePath: string, tag: string): ExtractedAPI[] {
	const apis: ExtractedAPI[] = [];

	// Build a merged type context: current file + all imported sibling files
	const typeContext = buildTypeContext(content, filePath, tag);

	// Find all @Component or @Directive decorated classes
	const classRe = /@(Component|Directive)\s*\(\s*\{([\s\S]*?)\}\s*\)\s*(?:export\s+)?class\s+(\w+)/g;
	let classMatch: RegExpExecArray | null;

	while ((classMatch = classRe.exec(content)) !== null) {
		const kind = classMatch[1].toLowerCase() as 'component' | 'directive';
		const decoratorBody = classMatch[2];
		const className = classMatch[3];

		// Find the class body (from the class declaration to the end)
		const classStart = classMatch.index + classMatch[0].length;
		const classBody = extractClassBody(content, classStart);
		if (classBody === null) continue; // null = unbalanced/not found; '' = empty body (e.g. `class X extends Y {}`) is valid

		// Extract decorator metadata
		const selectors = extractSelectors(decoratorBody);
		const standalone = !decoratorBody.includes('standalone: false');
		const exportAs = extractExportAs(decoratorBody);

		// Extract inputs, outputs, models
		const inputs = [
			...extractSignalInputs(classBody, typeContext),
			...extractDecoratorInputs(classBody),
		];
		const outputs = [
			...extractSignalOutputs(classBody),
			...extractDecoratorOutputs(classBody),
		];
		const models = extractModels(classBody);

		if (selectors.length === 0) continue;

		apis.push({
			kind,
			className,
			selectors,
			importPath: `@lucca-front/ng/${ngPackage}`,
			inputs,
			outputs,
			models,
			exportAs: exportAs ?? undefined,
			standalone,
		});
	}

	return apis;
}

/**
 * Extracts the class body (between { and }) using brace counting.
 */
function extractClassBody(content: string, startIdx: number): string | null {
	let depth = 0;
	let foundOpen = false;
	let bodyStart = startIdx;

	for (let i = startIdx; i < content.length; i++) {
		if (content[i] === '{') {
			if (!foundOpen) {
				foundOpen = true;
				bodyStart = i + 1;
			}
			depth++;
		} else if (content[i] === '}') {
			depth--;
			if (depth === 0 && foundOpen) {
				return content.slice(bodyStart, i);
			}
		}
	}

	return null;
}

// ─── Decorator metadata ─────────────────────────────────────────────────────

function extractSelectors(decoratorBody: string): string[] {
	const match = decoratorBody.match(/selector\s*:\s*['"`]([^'"`]+)['"`]/);
	if (!match) return [];
	return match[1].split(',').map((s) => s.trim()).filter(Boolean);
}

function extractExportAs(decoratorBody: string): string | null {
	const match = decoratorBody.match(/exportAs\s*:\s*['"`]([^'"`]+)['"`]/);
	return match?.[1] ?? null;
}

// ─── Shared signal-member scanner ────────────────────────────────────────────

/**
 * Reads from an opening delimiter at `openIdx` to its matching close, string-aware.
 * Returns the index of the matching close char, or -1.
 */
function readBalancedDelim(s: string, openIdx: number, open: string, close: string): number {
	let depth = 0;
	let q: string | null = null;
	for (let i = openIdx; i < s.length; i++) {
		const c = s[i];
		if (q) { if (c === q && s[i - 1] !== '\\') q = null; continue; }
		if (c === '"' || c === "'" || c === '`') { q = c; continue; }
		// Ignore the `>` of an arrow `=>` so function-typed generics like `input<(x) => Y>()` balance.
		if (close === '>' && c === '>' && s[i - 1] === '=') continue;
		if (c === open) depth++;
		else if (c === close) { depth--; if (depth === 0) return i; }
	}
	return -1;
}

export interface SignalMember {
	propName: string;
	generic?: string;
	argsStr: string;
	isRequired: boolean;
}

/**
 * Finds signal members `[modifiers] name = <fn>[.required][<...>](...)` in a class body.
 *
 * Unlike the historic regexes this does NOT require the `readonly` modifier (most LF components
 * declare `name = input()` without it), and it balances nested generics and parenthesised args
 * so function-call / spread defaults (e.g. `input(...intlInputOptions(...))`) don't truncate.
 * Line-anchored so member-access assignments (`this.x = input(...)`) are not matched.
 */
function findSignalMembers(classBody: string, fnName: string): SignalMember[] {
	const out: SignalMember[] = [];
	// Optional `: Type` annotation between the member name and `=` (e.g. `x: InputSignal<number> = input(…)`).
	const re = new RegExp(
		`(?:^|[\\n;{])[ \\t]*(?:(?:readonly|public|private|protected|override|declare|static)\\s+)*([A-Za-z_$][\\w$]*)\\s*(?::\\s*[^=;\\n]+)?\\s*=\\s*${fnName}\\b`,
		'g',
	);
	let m: RegExpExecArray | null;
	while ((m = re.exec(classBody)) !== null) {
		let i = m.index + m[0].length; // just after fnName
		let isRequired = false;
		const reqMatch = /^\s*\.\s*required\b/.exec(classBody.slice(i));
		if (reqMatch) { isRequired = true; i += reqMatch[0].length; }

		// optional balanced generic <...>
		let generic: string | undefined;
		const ltMatch = /^\s*</.exec(classBody.slice(i));
		if (ltMatch) {
			const ltIdx = i + ltMatch[0].length - 1;
			const gtIdx = readBalancedDelim(classBody, ltIdx, '<', '>');
			if (gtIdx !== -1) { generic = classBody.slice(ltIdx + 1, gtIdx).trim(); i = gtIdx + 1; }
		}

		// required '(' then balanced args
		const parenMatch = /^\s*\(/.exec(classBody.slice(i));
		if (!parenMatch) continue;
		const openIdx = i + parenMatch[0].length - 1;
		const closeIdx = readBalancedDelim(classBody, openIdx, '(', ')');
		if (closeIdx === -1) continue;

		out.push({ propName: m[1], generic, argsStr: classBody.slice(openIdx + 1, closeIdx).trim(), isRequired });
	}
	return out;
}

// ─── Signal inputs: input<Type>(), input(default, opts), input.required<Type>() ─

function extractSignalInputs(classBody: string, typeContext: string): ExtractedInput[] {
	const inputs: ExtractedInput[] = [];

	// Matches `[modifiers] propName = input[.required][<Type>](default, { alias, transform })`,
	// with or without `readonly`, balancing nested generics and parenthesised args.
	for (const member of findSignalMembers(classBody, 'input')) {
		const propName = member.propName;
		const genericType = member.generic;
		const argsStr = member.argsStr;
		const isRequired = member.isRequired;

		// Parse the type — resolve type aliases (pure alias or named member of a union)
		let type = genericType || inferTypeFromDefault(argsStr);
		let expandedValues: string[] | undefined;
		let expandedTypeName: string | undefined;
		const expansion = resolveTypeExpansion(type, typeContext);
		if (expansion) {
			type = expansion.type;
			expandedValues = expansion.expandedValues;
			expandedTypeName = expansion.expandedTypeName;
		}

		// Extract alias from options
		const aliasMatch = argsStr.match(/alias\s*:\s*['"](\w+)['"]/);
		const bindingName = aliasMatch?.[1] ?? propName;

		// Extract transform
		const transformMatch = argsStr.match(/transform\s*:\s*(\w+)/);
		const transform = transformMatch?.[1];

		// Extract default value (first argument before options object).
		// Skip spreads like `...intlInputOptions(...)` — that's an options factory, not a literal default.
		let defaultVal: string | undefined;
		if (!isRequired && argsStr && !argsStr.startsWith('...')) {
			const firstArg = argsStr.split(',')[0]?.trim();
			if (firstArg && !firstArg.startsWith('{') && !firstArg.startsWith('...')) {
				defaultVal = firstArg;
			}
		}

		inputs.push({
			propName,
			bindingName,
			type: type || 'unknown',
			required: isRequired,
			default: defaultVal,
			transform,
			source: 'signal',
			expandedValues,
			expandedTypeName,
		});
	}

	return inputs;
}

// ─── Decorator inputs: @Input() prop: Type = default ─────────────────────────

function extractDecoratorInputs(classBody: string): ExtractedInput[] {
	const inputs: ExtractedInput[] = [];

	// Find each @Input occurrence and parse it manually for multiline support
	const inputMarkerRe = /@Input\s*\(/g;
	let markerMatch: RegExpExecArray | null;

	while ((markerMatch = inputMarkerRe.exec(classBody)) !== null) {
		const startIdx = markerMatch.index + markerMatch[0].length;

		// Find the matching closing paren, handling nested braces
		let depth = 1;
		let braceDepth = 0;
		let i = startIdx;
		for (; i < classBody.length && depth > 0; i++) {
			if (classBody[i] === '{') braceDepth++;
			else if (classBody[i] === '}') braceDepth--;
			else if (classBody[i] === '(' && braceDepth === 0) depth++;
			else if (classBody[i] === ')' && braceDepth === 0) depth--;
		}
		if (depth !== 0) continue;

		const argsContent = classBody.slice(startIdx, i - 1).trim();

		// After the closing ), find the property/accessor declaration.
		// Strip leading comments and member modifiers (readonly/override/public/… — `override` in
		// particular was previously captured as the property name, yielding a phantom `override` input).
		let after = classBody.slice(i).replace(/^\s*(?:\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)*/, '');
		after = after.replace(/^(?:(?:readonly|override|public|private|protected|declare|static|abstract)\s+)*/, '');

		let propName: string;
		let type = 'unknown';
		let defaultVal: string | undefined;

		// Accessor input: `@Input('alias') set name(p: Type)` / `get name(): Type` (binding = alias).
		const accMatch = after.match(/^(get|set)\s+(\w+)/);
		if (accMatch) {
			propName = accMatch[2];
			const rest = after.slice(accMatch[0].length);
			if (accMatch[1] === 'set') {
				const pm = rest.match(/^\s*\(\s*\w+\s*\??\s*:\s*([^)]+)\)/);
				if (pm) type = pm[1].trim();
			} else {
				const pm = rest.match(/^\s*\(\s*\)\s*:\s*([^={;\n]+)/);
				if (pm) type = pm[1].trim();
			}
		} else {
			const propMatch = after.match(/^(\w+)\s*(?::\s*([^=;\n]+))?\s*(?:=\s*([^;\n]+))?/);
			if (!propMatch) continue;
			propName = propMatch[1];
			if (['class', 'if', 'return', 'const', 'let', 'var', 'function', 'constructor'].includes(propName)) continue;
			type = propMatch[2]?.trim() ?? 'unknown';
			defaultVal = propMatch[3]?.trim();
		}

		// Parse the args
		let bindingName = propName;
		let required = false;
		let transform: string | undefined;

		if (argsContent.startsWith("'") || argsContent.startsWith('"')) {
			// @Input('alias')
			const alias = argsContent.slice(1, -1);
			if (alias) bindingName = alias;
		} else if (argsContent.startsWith('{')) {
			// @Input({ transform: booleanAttribute, alias: 'foo' })
			const aliasMatch = argsContent.match(/alias\s*:\s*['"](\w+)['"]/);
			if (aliasMatch) bindingName = aliasMatch[1];

			required = /required\s*:\s*true/.test(argsContent);

			const transformMatch = argsContent.match(/transform\s*:\s*(\w+)/);
			transform = transformMatch?.[1];
		}

		// Infer type from transform or default value when annotation is missing
		let resolvedType = type;
		if (resolvedType === 'unknown') {
			if (transform === 'booleanAttribute') resolvedType = 'boolean';
			else if (transform === 'numberAttribute') resolvedType = 'number';
			else if (defaultVal === 'true' || defaultVal === 'false') resolvedType = 'boolean';
			else if (defaultVal && /^\d+$/.test(defaultVal)) resolvedType = 'number';
			else if (defaultVal && (defaultVal.startsWith("'") || defaultVal.startsWith('"'))) resolvedType = 'string';
		}

		inputs.push({
			propName,
			bindingName,
			type: resolvedType,
			required,
			default: defaultVal,
			transform,
			source: 'decorator',
		});
	}

	return inputs;
}

// ─── Signal outputs: output<Type>() ──────────────────────────────────────────

function extractSignalOutputs(classBody: string): ExtractedOutput[] {
	const outputs: ExtractedOutput[] = [];

	// `[modifiers] name = output<Type>()` or `outputFromObservable<Type>(...)`, with or without `readonly`.
	for (const fn of ['output', 'outputFromObservable']) {
		for (const member of findSignalMembers(classBody, fn)) {
			outputs.push({
				propName: member.propName,
				bindingName: member.propName,
				type: member.generic || 'void',
				source: 'signal',
			});
		}
	}

	return outputs;
}

// ─── Decorator outputs: @Output() prop = new EventEmitter<Type>() ────────────

function extractDecoratorOutputs(classBody: string): ExtractedOutput[] {
	const outputs: ExtractedOutput[] = [];

	const decoratorRe = /@Output\s*\(\s*(?:'([^']*)')?\s*\)\s*(?:(?:readonly|override|public|private|protected|declare|static)\s+)*(\w+)\s*=\s*new\s+EventEmitter\s*(?:<([^>]*)>)?\s*\(/g;
	let match: RegExpExecArray | null;

	while ((match = decoratorRe.exec(classBody)) !== null) {
		outputs.push({
			propName: match[2],
			bindingName: match[1] || match[2],
			type: match[3]?.trim() || 'void',
			source: 'decorator',
		});
	}

	return outputs;
}

// ─── Models: model<Type>(), model.required<Type>() ───────────────────────────

function extractModels(classBody: string): ExtractedModel[] {
	const models: ExtractedModel[] = [];

	// `[modifiers] name = model[.required][<Type>](default)`, with or without `readonly`.
	for (const member of findSignalMembers(classBody, 'model')) {
		models.push({
			propName: member.propName,
			bindingName: member.propName,
			type: member.generic || 'unknown',
			required: member.isRequired,
		});
	}

	return models;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Builds a merged type context by concatenating the current file content
 * with all relative-imported sibling files. This allows type alias resolution
 * across file boundaries (e.g., `ButtonSize` defined in `./button-type.ts`).
 */
function buildTypeContext(content: string, filePath: string, tag: string): string {
	const parts = [content];
	const dir = path.dirname(filePath);

	// Find all relative imports (including `import type { ... }`)
	const importRe = /import\s+(?:type\s+)?\{[^}]*\}\s+from\s+['"](\.[^'"]+)['"]/g;
	let match: RegExpExecArray | null;

	while ((match = importRe.exec(content)) !== null) {
		const importPath = match[1];
		let resolved = path.posix.normalize(`${dir}/${importPath}`);
		if (!resolved.endsWith('.ts')) resolved += '.ts';

		const imported = gitShow(tag, resolved);
		if (imported) parts.push(imported);
	}

	// Also follow @lucca/prisme/* imports (cross-package types like Palette)
	const prismeImportRe = /import\s+(?:type\s+)?\{[^}]*\}\s+from\s+['"]@lucca\/prisme\/([^'"]+)['"]/g;
	while ((match = prismeImportRe.exec(content)) !== null) {
		const subPkg = match[1];
		// Try public-api first, then index
		for (const candidate of [`packages/prisme/${subPkg}/public-api.ts`, `packages/prisme/${subPkg}/index.ts`]) {
			const imported = gitShow(tag, candidate);
			if (imported) {
				parts.push(imported);
				// Follow its re-exports one level deep
				const reExportRe = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g;
				let reMatch: RegExpExecArray | null;
				while ((reMatch = reExportRe.exec(imported)) !== null) {
					let deepPath = path.posix.normalize(`packages/prisme/${subPkg}/${reMatch[1]}`);
					if (!deepPath.endsWith('.ts')) deepPath += '.ts';
					const deep = gitShow(tag, deepPath);
					if (deep) parts.push(deep);
				}
				break;
			}
		}
	}

	// Also follow @lucca-front/icons imports (LuccaIcon type — path varies by version)
	const luccaFrontIconsRe = /import\s+(?:type\s+)?\{[^}]*\}\s+from\s+['"]@lucca-front\/icons['"]/g;
	while ((match = luccaFrontIconsRe.exec(content)) !== null) {
		for (const candidate of ['packages/icons/index.d.ts', 'packages/icons/index.ts']) {
			const imported = gitShow(tag, candidate);
			if (imported) {
				parts.push(imported);
				// If this file re-exports from @lucca/prisme/icon, follow it
				const prismeReExportRe = /from\s+['"]@lucca\/prisme\/([^'"]+)['"]/;
				const prismeReExport = imported.match(prismeReExportRe);
				if (prismeReExport) {
					const subPkg = prismeReExport[1];
					for (const deepCandidate of [`packages/prisme/${subPkg}/public-api.ts`, `packages/prisme/${subPkg}/index.ts`]) {
						const deep = gitShow(tag, deepCandidate);
						if (deep) {
							parts.push(deep);
							// Follow one level of re-exports
							const reExportRe = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g;
							let reMatch: RegExpExecArray | null;
							while ((reMatch = reExportRe.exec(deep)) !== null) {
								let deeperPath = path.posix.normalize(`packages/prisme/${subPkg}/${reMatch[1]}`);
								if (!deeperPath.endsWith('.ts')) deeperPath += '.ts';
								const deeper = gitShow(tag, deeperPath);
								if (deeper) parts.push(deeper);
							}
							break;
						}
					}
				}
				break;
			}
		}
	}

	return parts.join('\n\n');
}

function inferTypeFromDefault(argsStr: string): string {
	if (!argsStr) return 'unknown';
	const firstArg = argsStr.split(',')[0]?.trim();
	if (!firstArg || firstArg.startsWith('{')) return 'unknown';
	if (firstArg === 'true' || firstArg === 'false') return 'boolean';
	if (/^\d+$/.test(firstArg)) return 'number';
	if (firstArg.startsWith("'") || firstArg.startsWith('"')) return 'string';
	return 'unknown';
}

/**
 * Resolves a type alias by looking at import statements in the file.
 * For example, `ButtonSize` → finds `import { ButtonSize } from './button-type'`
 * then looks for `export type ButtonSize = ...` in that file.
 *
 * Returns the resolved type string (e.g. "'M' | 'S' | 'XS'") or null.
 */
/**
 * Resolves type aliases in a declared input type, in two shapes:
 *
 * - **Pure alias** (`ButtonSize`): historic behavior — substituted inline when it resolves to a
 *   short literal union (≤ 10 values), or kept by name with its values expanded apart (> 10,
 *   e.g. `LuccaIcon`).
 * - **Union** (`BubbleIllustration | string | null`): each named member is resolved individually;
 *   the first member resolving to a large literal union (> 10) is expanded apart while the
 *   declared union is kept as-is in the table. Without this, widening an input type (the common
 *   `Alias | string` autocomplete-friendly idiom) silently drops the documented value list.
 *
 * Returns null when nothing resolves (type left untouched by the caller).
 */
function resolveTypeExpansion(
	type: string,
	typeContext: string,
): { type: string; expandedValues?: string[]; expandedTypeName?: string } | null {
	if (!type) return null;

	// Pure alias.
	const resolved = resolveTypeAlias(type, typeContext);
	if (resolved) {
		const values = extractStringUnionValues(resolved);
		if (values && values.length > 10) {
			// Keep the alias name in `type` for brevity, expose values separately
			return { type, expandedValues: values, expandedTypeName: type.trim() };
		}
		return { type: resolved };
	}

	// Union: try each named member individually. Only the first large alias is expanded (one
	// expandedValues per input). Short members are NOT substituted inline — the declared union
	// stays readable as written in the source.
	if (type.includes('|')) {
		for (const member of type.split('|').map((m) => m.trim())) {
			if (!/^[A-Za-z_]\w*$/.test(member)) continue;
			const memberResolved = resolveTypeAlias(member, typeContext);
			if (!memberResolved) continue;
			const values = extractStringUnionValues(memberResolved);
			if (values && values.length > 10) {
				return { type, expandedValues: values, expandedTypeName: member };
			}
		}
	}

	return null;
}

function resolveTypeAlias(type: string, fullContent: string): string | null {
	if (!type || type === 'unknown' || type.includes('|') || type.includes("'") || type.includes('"')) {
		return null;
	}

	// Look for `export type TypeName = ...;` (multiline-aware: use [\s\S]*? up to the semicolon)
	// or `export const TYPE_NAME = [...] as const; export type TypeName = (typeof TYPE_NAME)[number]`
	const typeDefRe = new RegExp(`export\\s+type\\s+${type}\\s*=\\s*([\\s\\S]*?);`);
	const typeDef = fullContent.match(typeDefRe);
	if (typeDef) {
		const resolved = typeDef[1].trim();
		// If it's a typeof reference, find the const
		const typeofMatch = resolved.match(/\(typeof\s+(\w+)\)\s*\[number\]/);
		if (typeofMatch) {
			const constName = typeofMatch[1];
			const constRe = new RegExp(`export\\s+const\\s+${constName}\\s*=\\s*\\[([^\\]]+)\\]\\s+as\\s+const`);
			const constDef = fullContent.match(constRe);
			if (constDef) {
				return constDef[1]
					.split(',')
					.map((v) => v.trim())
					.filter(Boolean)
					.join(' | ');
			}
		}
		return resolved;
	}

	return null;
}

/**
 * Extracts individual string literal values from a union type string.
 * Returns the values if the union contains string literals only, otherwise null.
 * Example: `'a' | 'b' | 'c'` → `['a', 'b', 'c']`
 */
function extractStringUnionValues(unionType: string): string[] | null {
	const normalized = unionType.replace(/\s*\|\s*/g, '|').trim().replace(/^\|/, '');
	const parts = normalized.split('|').map((p) => p.trim()).filter(Boolean);
	// All parts must be string literals (wrapped in single or double quotes)
	if (parts.every((p) => /^['"][^'"]*['"]$/.test(p))) {
		return parts.map((p) => p.slice(1, -1));
	}
	return null;
}

function gitShow(tag: string, filePath: string): string | null {
	try {
		return execSync(`git show ${tag}:${filePath}`, {
			cwd: WORKSPACE_ROOT,
			encoding: 'utf-8',
			maxBuffer: 2 * 1024 * 1024,
			stdio: ['pipe', 'pipe', 'pipe'],
		});
	} catch {
		return null;
	}
}
