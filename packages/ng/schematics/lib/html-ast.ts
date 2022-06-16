import { ASTWithSource, ParsedTemplate, parseTemplate, TmplAstBoundAttribute, TmplAstContent, TmplAstElement, TmplAstTemplate, TmplAstTextAttribute } from '@angular/compiler';
import { applyUpdates, FileUpdate } from './file-update';

export type TemplateNode = ParsedTemplate['nodes'] extends Array<infer S> ? S : never;

export class HtmlAst {
	private parsed: ParsedTemplate;

	public constructor(content: string) {
		this.parsed = parseTemplate(content, 'migration.html', { preserveWhitespaces: true });
	}

	public visitAttribute(attributeFilter: string | RegExp, cb: (attr: TmplAstTextAttribute) => void): void {
		this.visitNodes((node) => {
			if (node instanceof TmplAstElement || node instanceof TmplAstTemplate || node instanceof TmplAstContent) {
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
			if (node instanceof TmplAstElement || node instanceof TmplAstTemplate) {
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

			if (node instanceof TmplAstElement || node instanceof TmplAstTemplate) {
				this.visit(cb, node.children);
			}
		}
	}

	private matchFilter(value: string, filter: string | RegExp): boolean {
		return typeof filter === 'string' ? value === filter : !!value.match(filter);
	}
}

export function updateCssClassNames(content: string, oldClassToNewClass: Record<string, string>): string {
	const updates: FileUpdate[] = [];
	const root = new HtmlAst(content);
	const classesToFind = Object.keys(oldClassToNewClass);

	root.visitAttribute('class', (classAttr) => {
		const offset = classAttr.valueSpan?.start.offset;
		if (classesToFind.some((cl) => classAttr.value.includes(cl)) && offset !== undefined) {
			updates.push({
				position: offset,
				oldContent: classAttr.value,
				newContent: classesToFind.reduce((acc, cl) => acc.replace(cl, oldClassToNewClass[cl]), classAttr.value),
			});
		}
	});

	for (const cl of classesToFind) {
		root.visitBoundAttribute(cl, (boundAttr) => {
			updates.push({
				position: boundAttr.keySpan.start.offset,
				oldContent: boundAttr.keySpan.details || '',
				newContent: boundAttr.keySpan.details?.replace(cl, oldClassToNewClass[cl]) || '',
			});
		});
	}

	root.visitBoundAttribute('ngClass', (boundAttr) => {
		if (!(boundAttr.value instanceof ASTWithSource)) {
			return;
		}

		const { source } = boundAttr.value;

		if (classesToFind.some((cl) => source?.includes(cl))) {
			updates.push({
				position: boundAttr.value.sourceSpan.start,
				oldContent: boundAttr.value.source || '',
				newContent: classesToFind.reduce((acc, cl) => acc.replace(cl, oldClassToNewClass[cl]), source || ''),
			});
		}
	});

	return applyUpdates(content, updates);
}
