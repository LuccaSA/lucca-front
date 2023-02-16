// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ParsedTemplate, TmplAstBoundAttribute, TmplAstElement, TmplAstNode, TmplAstTextAttribute } from '@angular/compiler';
import { applyUpdates, FileUpdate } from './file-update.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type AngularCompilerLib = typeof import('@angular/compiler');
export type TemplateNode = ParsedTemplate['nodes'] extends Array<infer S> ? S : never;

export class HtmlAst {
	private parsed: ParsedTemplate;

	public constructor(content: string, private lib: AngularCompilerLib) {
		this.parsed = lib.parseTemplate(content, 'migration.html', { preserveWhitespaces: true });
	}

	public visitElements(elementFilter: string | RegExp, cb: (attr: TmplAstElement) => void): void {
		this.visitNodes((node) => {
			if (node instanceof this.lib.TmplAstElement) {
				if (this.matchFilter(node.name, elementFilter)) {
					cb(node);
				}
			}
		});
	}

	public visitAttribute(attributeFilter: string | RegExp, cb: (attr: TmplAstTextAttribute) => void): void {
		this.visitNodes((node) => {
			if (node instanceof this.lib.TmplAstElement || node instanceof this.lib.TmplAstTemplate || node instanceof this.lib.TmplAstContent) {
				for (const attr of node.attributes) {
					if (this.matchFilter(attr.name, attributeFilter)) {
						cb(attr);
					}
				}
			}
		});
	}

	public visitBoundAttribute(attributeFilter: string | RegExp, cb: (attr: TmplAstBoundAttribute) => void): void {
		this.visitNodes((node) => {
			if (node instanceof this.lib.TmplAstElement || node instanceof this.lib.TmplAstTemplate) {
				for (const input of node.inputs) {
					if (this.matchFilter(input.name, attributeFilter)) {
						cb(input);
					}
				}
			}
		});
	}

	public visitNodes(cb: (node: TemplateNode) => void): void {
		this.visit(cb, this.parsed.nodes);
	}

	private visit(cb: (node: TemplateNode) => void, nodes: TemplateNode[]): void {
		for (const node of nodes) {
			cb(node);

			if (node instanceof this.lib.TmplAstElement || node instanceof this.lib.TmplAstTemplate) {
				this.visit(cb, node.children);
			}
		}
	}

	private matchFilter(value: string, filter: string | RegExp): boolean {
		return typeof filter === 'string' ? value === filter : !!value.match(filter);
	}
}

export function updateCssClassNames(content: string, oldClassToNewClass: Record<string, string>, lib: AngularCompilerLib): string {
	const updates: FileUpdate[] = [];
	const root = new HtmlAst(content, lib);
	const classesToFind = new Set(Object.keys(oldClassToNewClass));
	const visitedAttributes = new Set<TmplAstNode>();

	root.visitAttribute('class', (classAttr) => {
		const offset = classAttr.valueSpan?.start.offset;

		if (visitedAttributes.has(classAttr)) {
			return;
		}

		visitedAttributes.add(classAttr);
		const classes: string[] = classAttr.value.split(' ');

		if (classes.some((cl) => classesToFind.has(cl)) && offset !== undefined) {
			updates.push({
				position: offset,
				oldContent: classAttr.value,
				newContent: classes.map((cl) => oldClassToNewClass[cl] || cl).join(' '),
			});
		}
	});

	root.visitBoundAttribute(/.*/, (boundAttr) => {
		if (visitedAttributes.has(boundAttr)) {
			return;
		}

		const cl = boundAttr.name;
		if (!classesToFind.has(cl)) {
			return;
		}

		visitedAttributes.add(boundAttr);

		updates.push({
			position: boundAttr.keySpan.start.offset,
			oldContent: boundAttr.keySpan.details || '',
			newContent: boundAttr.keySpan.details?.replace(`class.${cl}`, `class.${oldClassToNewClass[cl]}`) || '',
		});
	});

	root.visitBoundAttribute('ngClass', (boundAttr) => {
		if (!(boundAttr.value instanceof lib.ASTWithSource)) {
			return;
		}

		if (visitedAttributes.has(boundAttr)) {
			return;
		}

		visitedAttributes.add(boundAttr);

		const { source } = boundAttr.value;

		const oldContent = boundAttr.value.source || '';
		const newContent = (source || '').replace(
			/(["']?)([\w\-_]*?)(["']?):/g,
			(_fullMatch, before: string, middle: string, after: string) => `${before + (oldClassToNewClass[middle] || middle) + after}:`,
		);

		if (oldContent !== newContent) {
			updates.push({
				position: boundAttr.value.sourceSpan.start,
				oldContent,
				newContent,
			});
		}
	});

	return applyUpdates(content, updates);
}

export function extractAllCssClassNames(content: string, lib: AngularCompilerLib): string[] {
	const allClasses = new Set<string>();
	const root = new HtmlAst(content, lib);

	root.visitAttribute('class', (classAttr) => classAttr.value.split(' ').forEach((cls) => allClasses.add(cls)));

	root.visitBoundAttribute(/.*/, (boundAttr) => {
		if (boundAttr.keySpan.details?.startsWith('class.')) {
			allClasses.add(boundAttr.name);
		}
	});

	return [...allClasses];
}

export function extractAllHtmlElementNames(content: string, lib: AngularCompilerLib): string[] {
	const allElements = new Set<string>();
	const root = new HtmlAst(content, lib);

	root.visitElements(/.*/, (element) => allElements.add(element.name));

	return [...allElements];
}
