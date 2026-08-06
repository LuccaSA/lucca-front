/**
 * Static extraction of the Storybook documentation stories (`stories/documentation`)
 * into an LLM-consumable usage corpus — the companion of `extract-api.mjs`: the API
 * surface says what exists, the stories say how it is used (canonical markup for both
 * the Angular and HTML&CSS arms, plus the per-prop French descriptions maintained in
 * `argTypes`).
 *
 * Extraction is purely syntactic (ts-morph AST, no type checker, no Storybook
 * runtime): the Meta `title`, every `template:` literal (following one level of
 * in-file indirection — the `Template`/`getTemplate` idiom of the HTML&CSS arm),
 * story export names, and `argTypes.*.description` strings. Deterministic: same
 * source in, same corpus out.
 *
 * @see generate-llms.mjs (orchestrates this into llms-full.txt and the per-category files)
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { Node, Project } from 'ts-morph';

/**
 * @typedef {Object} StoryEntry
 * @property {string} name — the exported story name
 * @property {Array<{ name: string, description: string }>} argTypes — props carrying a description
 *
 * @typedef {Object} StoriesFile
 * @property {string} title — the Meta `title` (e.g. `Documentation/Actions/Button/Angular/Basic`)
 * @property {StoryEntry[]} stories
 * @property {string[]} templates — every template literal reachable from a `template:` property
 */

/**
 * Split a documentation title into its hierarchy. The canonical shape is
 * `Documentation/<Category>/<Component>/<Angular|HTML&CSS>/<Variant…>`; shorter
 * titles degrade gracefully (missing segments come back empty).
 * @param {string} title
 */
export function parseTitle(title) {
	const [, category = '', component = '', arm = '', ...variant] = title.split('/');
	return { category, component, arm, variant: variant.join('/') };
}

/** Literal text of a string or (no-substitution) template literal node, else undefined. */
function literalText(node) {
	if (!node) return undefined;
	if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) return node.getLiteralText();
	if (Node.isTemplateExpression(node)) return node.getText().slice(1, -1);
	return undefined;
}

/** The object literal a node resolves to: itself, or `X as Meta` / parenthesized. */
function asObjectLiteral(node) {
	if (!node) return undefined;
	if (Node.isObjectLiteralExpression(node)) return node;
	if (Node.isAsExpression(node) || Node.isParenthesizedExpression(node) || Node.isSatisfiesExpression(node)) {
		return asObjectLiteral(node.getExpression());
	}
	return undefined;
}

/** Initializer of `name:` in an object literal (property assignments only). */
function propInitializer(objectLiteral, name) {
	const prop = objectLiteral?.getProperty(name);
	return prop && Node.isPropertyAssignment(prop) ? prop.getInitializer() : undefined;
}

/**
 * The Meta object literal of a stories file: the default export, either inline
 * (`export default {...} as Meta`) or through a local identifier (`export default meta`).
 * @param {import('ts-morph').SourceFile} sourceFile
 */
function metaObjectOf(sourceFile) {
	const assignment = sourceFile.getExportAssignment((ea) => !ea.isExportEquals());
	let expr = assignment?.getExpression();
	if (expr && Node.isIdentifier(expr)) {
		const decl = sourceFile.getVariableDeclaration(expr.getText());
		expr = decl?.getInitializer();
	}
	return asObjectLiteral(expr);
}

/**
 * `argTypes` entries carrying a `description`, in source order. Props without a
 * description are controls-only configuration — no documentation value.
 * @param {import('ts-morph').ObjectLiteralExpression | undefined} storyObject
 */
function argTypesOf(storyObject) {
	const argTypes = asObjectLiteral(propInitializer(storyObject, 'argTypes'));
	if (!argTypes) return [];
	const out = [];
	for (const prop of argTypes.getProperties()) {
		if (!Node.isPropertyAssignment(prop)) continue;
		const description = literalText(propInitializer(asObjectLiteral(prop.getInitializer()), 'description'));
		if (description) out.push({ name: prop.getName().replace(/^(['"])(.*)\1$/, '$2'), description });
	}
	return out;
}

/** First template/string literal found in a function body's return values, or undefined. */
function templateInBody(fnNode) {
	if (!fnNode) return undefined;
	// Arrow with an expression body returning an object literal, or a block body.
	const returned = [];
	if (Node.isArrowFunction(fnNode) && !Node.isBlock(fnNode.getBody())) {
		returned.push(fnNode.getBody());
	} else if (typeof fnNode.getDescendantStatements === 'function') {
		for (const st of fnNode.getDescendantStatements()) {
			if (Node.isReturnStatement(st) && st.getExpression()) returned.push(st.getExpression());
		}
	}
	for (const expr of returned) {
		const direct = literalText(Node.isParenthesizedExpression(expr) ? expr.getExpression() : expr);
		if (direct) return direct;
	}
	return undefined;
}

/** Resolve an in-file identifier to its function/variable-initializer node. */
function localDeclarationOf(sourceFile, name) {
	return sourceFile.getFunction(name) ?? sourceFile.getVariableDeclaration(name)?.getInitializer();
}

/**
 * Every template reachable from a `template:` property in the file: a direct
 * template/string literal, or one level of in-file indirection (`template:
 * getTemplate(args)` → the literal returned by `getTemplate`). Deduplicated,
 * in source order.
 * @param {import('ts-morph').SourceFile} sourceFile
 */
function templatesOf(sourceFile) {
	const templates = [];
	sourceFile.forEachDescendant((node) => {
		// Shorthand `{ template }` — resolve the local `template` variable's literal.
		if (Node.isShorthandPropertyAssignment(node) && node.getName() === 'template') {
			const text = literalText(localDeclarationOf(sourceFile, 'template'));
			if (text && !templates.includes(text)) templates.push(text);
			return;
		}
		if (!Node.isPropertyAssignment(node) || node.getName() !== 'template') return;
		const init = node.getInitializer();
		let text = literalText(init);
		if (!text && init && Node.isCallExpression(init)) {
			// `template: cleanupTemplate(\`...\`)` — the literal is the helper's argument.
			text = literalText(init.getArguments()[0]);
		}
		if (!text && init && (Node.isCallExpression(init) || Node.isIdentifier(init))) {
			const callee = Node.isCallExpression(init) ? init.getExpression().getText() : init.getText();
			text = templateInBody(localDeclarationOf(sourceFile, callee));
		}
		if (text && !templates.includes(text)) templates.push(text);
	});
	return templates;
}

/**
 * Extract one documentation stories file: Meta title, story exports (object
 * literals only — `createTestStory(...)` wrappers are interaction tests, not
 * documentation) and every reachable template.
 * @param {import('ts-morph').SourceFile} sourceFile
 * @returns {StoriesFile}
 */
export function extractStoriesFile(sourceFile) {
	const meta = metaObjectOf(sourceFile);
	const title = literalText(propInitializer(meta, 'title')) ?? '';
	const metaArgTypes = argTypesOf(meta);

	const stories = [];
	for (const varDecl of sourceFile.getVariableDeclarations()) {
		// `export const X = {...}` only — `isExported()` is also true for the
		// `const meta = {...}; export default meta;` idiom, which is the Meta.
		if (!varDecl.getVariableStatement()?.hasExportKeyword()) continue;
		const init = varDecl.getInitializer();
		let storyObject = asObjectLiteral(init);
		if (!storyObject && init && Node.isCallExpression(init)) {
			// Story factories (`generateStory({...})`) still document a story — only
			// `createTestStory` wrappers are interaction tests, not documentation.
			if (init.getExpression().getText() === 'createTestStory') continue;
			storyObject = asObjectLiteral(init.getArguments()[0]);
			if (!storyObject) continue;
		}
		if (!storyObject) continue;
		const own = argTypesOf(storyObject);
		stories.push({ name: varDecl.getName(), argTypes: own.length ? own : metaArgTypes });
	}

	return { title, stories, templates: templatesOf(sourceFile) };
}

/**
 * Group extracted files by `<Category>/<Component>` (both arms of a component land
 * in the same group), alpha-sorted by key; files inside a group keep a stable
 * title order.
 * @param {StoriesFile[]} files
 * @returns {Array<{ key: string, files: StoriesFile[] }>}
 */
export function groupByComponent(files) {
	const groups = new Map();
	for (const file of files) {
		if (!file.title) continue;
		const { category, component } = parseTitle(file.title);
		const key = component ? `${category}/${component}` : category;
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key).push(file);
	}
	return [...groups.entries()]
		.map(([key, groupFiles]) => ({ key, files: [...groupFiles].sort((a, b) => a.title.localeCompare(b.title)) }))
		.sort((a, b) => a.key.localeCompare(b.key));
}

/** Single-line table text: HTML tags reduced to spaces, pipes escaped, whitespace collapsed. */
function cell(raw) {
	return String(raw ?? '')
		.replace(/<\/?[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.replace(/\|/g, '\\|')
		.trim();
}

/**
 * Render grouped stories as Markdown: one `##` per component, one `###` per
 * arm/variant with its template fence and argTypes table. Deterministic.
 * @param {Array<{ key: string, files: StoriesFile[] }>} groups
 * @returns {string}
 */
export function renderStoriesSection(groups) {
	const lines = [];
	for (const group of groups) {
		lines.push(`## ${group.key.split('/').join(' / ')}`, '');
		for (const file of group.files) {
			const { arm, variant } = parseTitle(file.title);
			lines.push(`### ${[arm, variant].filter(Boolean).join(' — ') || file.title}`, '');
			for (const template of file.templates) {
				lines.push('```html', template.trim(), '```', '');
			}
			// One argTypes table per distinct prop set — stories of a file share the Meta's.
			const seen = new Set();
			for (const story of file.stories) {
				if (!story.argTypes.length) continue;
				const signature = story.argTypes.map((a) => a.name).join(',');
				if (seen.has(signature)) continue;
				seen.add(signature);
				lines.push('| Prop | Description |', '| --- | --- |');
				for (const arg of story.argTypes) lines.push(`| \`${arg.name}\` | ${cell(arg.description)} |`);
				lines.push('');
			}
		}
	}
	return lines.join('\n');
}

/** Recursively collect `*.stories.ts` files under `dir`, alpha-sorted. */
export function findStoriesFiles(dir) {
	const out = [];
	const walk = (d) => {
		for (const entry of readdirSync(d, { withFileTypes: true })) {
			if (entry.isDirectory()) walk(join(d, entry.name));
			else if (entry.name.endsWith('.stories.ts')) out.push(join(d, entry.name));
		}
	};
	walk(dir);
	return out.sort((a, b) => a.localeCompare(b));
}

/**
 * Extract every documentation story under `storiesDir` with a syntactic-only
 * ts-morph project (no tsconfig, no type checking — fast and dependency-free).
 * @param {string} storiesDir — absolute path to `stories/documentation`
 * @returns {StoriesFile[]}
 */
export function extractAllStories(storiesDir) {
	const project = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: false } });
	return findStoriesFiles(storiesDir).map((path) => extractStoriesFile(project.addSourceFileAtPath(path)));
}
