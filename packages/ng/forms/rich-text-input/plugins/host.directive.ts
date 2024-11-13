import { Directive } from '@angular/core';
import { LexicalNode } from 'lexical';

@Directive({
	selector: '[luRichTextPluginHost]',
	standalone: true,
})
export class HostDirective {
	nodes: Set<typeof LexicalNode> = new Set();

	registerLexicalNode(nodes: (typeof LexicalNode)[]) {
		nodes.forEach((node: typeof LexicalNode) => {
			this.nodes.add(node);
		});
	}
}
