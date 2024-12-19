// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
	ASTWithSource,
	ParsedTemplate,
	parseTemplate,
	TmplAstBoundAttribute,
	TmplAstContent,
	TmplAstDeferredBlock,
	TmplAstElement,
	TmplAstForLoopBlock,
	TmplAstIfBlock,
	TmplAstNode,
	TmplAstSwitchBlock,
	TmplAstTemplate,
	TmplAstTextAttribute,
} from '@angular/compiler';
import { createSourceFile, ScriptTarget } from 'typescript';
import { applyUpdates, updateContent } from './file-update.js';
import { replaceStringLiterals } from './typescript-ast.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type TemplateNode = ParsedTemplate['nodes'] extends Array<infer S> ? S : never;

export class HtmlAstVisitor<TNode extends TemplateNode> {
	private nodes: TNode[];

	public constructor(nodes: TNode[] | TNode) {
		this.nodes = Array.isArray(nodes) ? nodes : [nodes];
	}

	public visitElements(elementFilter: string | RegExp, cb: (attr: TmplAstElement) => void): void {
		this.visitNodes((node) => {
			if (node instanceof TmplAstElement) {
				if (this.matchFilter(node.name, elementFilter)) {
					cb(node);
				}
			}
		});
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

	public visitElementWithAttribute(elementFilter: string | RegExp, attributeFilter: string | RegExp, cb: (elem: TmplAstElement, attr: TmplAstTextAttribute) => void): void {
		this.visitNodes((node) => {
			if (node instanceof TmplAstElement) {
				if (this.matchFilter(node.name, elementFilter)) {
					for (const attr of node.attributes) {
						if (this.matchFilter(attr.name, attributeFilter)) {
							cb(node, attr);
						}
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
		this.visit(cb, this.nodes);
	}

	private visit(cb: (node: TemplateNode) => void, nodes: TemplateNode[]): void {
		for (const node of nodes) {
			cb(node);
			if (node instanceof TmplAstIfBlock) {
				// Visit @if branches
				node.branches.forEach((branch) => {
					this.visit(cb, branch.children);
				});
			} else if (node instanceof TmplAstForLoopBlock) {
				// Visit @for's children
				this.visit(cb, node.children);

				if (node.empty) {
					// If we have an @empty block, visit its children too
					this.visit(cb, node.empty.children);
				}
			} else if (node instanceof TmplAstSwitchBlock) {
				node.cases.forEach((caseNode) => {
					this.visit(cb, caseNode.children);
				});
			} else if (node instanceof TmplAstDeferredBlock || node instanceof TmplAstElement || node instanceof TmplAstTemplate) {
				// Visit @defer and classic AST elements
				this.visit(cb, node.children);
			}
		}
	}

	private matchFilter(value: string, filter: string | RegExp): boolean {
		return typeof filter === 'string' ? value === filter : !!value.match(filter);
	}
}

export class HtmlAst extends HtmlAstVisitor<TemplateNode> {
	public constructor(content: string) {
		super(
			parseTemplate(content, 'migration.html', {
				preserveWhitespaces: true,
				enableBlockSyntax: true,
			}).nodes,
		);
	}
}

export function updateCssClassNames(content: string, oldClassToNewClass: Record<string, string>): string {
	return updateContent(content, (updates) => {
		const root = new HtmlAst(content);
		const visitedAttributes = new WeakSet<TmplAstNode>();
		const cssClassesToUpdate = new Set(Object.keys(oldClassToNewClass));

		root.visitAttribute('class', (classAttr) => {
			const offset = classAttr.valueSpan?.start.offset;

			if (visitedAttributes.has(classAttr)) {
				return;
			}

			visitedAttributes.add(classAttr);
			const classes: string[] = classAttr.value.split(' ');

			if (classes.some((cl) => cssClassesToUpdate.has(cl)) && offset !== undefined) {
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
			if (!cssClassesToUpdate.has(cl)) {
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
			if (!(boundAttr.value instanceof ASTWithSource)) {
				return;
			}

			if (visitedAttributes.has(boundAttr)) {
				return;
			}

			visitedAttributes.add(boundAttr);

			if (boundAttr.valueSpan) {
				const attrValue = boundAttr.value.source || '';
				const sourcefile = createSourceFile('', attrValue, ScriptTarget.ESNext);

				updates.push({
					position: boundAttr.valueSpan.start.offset,
					oldContent: attrValue,
					newContent: applyUpdates(attrValue, replaceStringLiterals(sourcefile, oldClassToNewClass)),
				});
			}
		});
	});
}

export function extractAllCssClassNames(content: string): string[] {
	const allClasses = new Set<string>();
	const root = new HtmlAst(content);

	root.visitAttribute('class', (classAttr) => classAttr.value.split(' ').forEach((cls) => allClasses.add(cls)));

	root.visitBoundAttribute(/.*/, (boundAttr) => {
		if (boundAttr.keySpan.details?.startsWith('class.')) {
			allClasses.add(boundAttr.name);
		}
	});

	return [...allClasses];
}

export function extractAllHtmlElementNames(content: string): string[] {
	const allElements = new Set<string>();
	const root = new HtmlAst(content);

	root.visitElements(/.*/, (element) => allElements.add(element.name));

	return [...allElements];
}
