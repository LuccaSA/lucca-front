import { Directive, inject } from '@angular/core';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
	BOLD_ITALIC_STAR,
	BOLD_ITALIC_UNDERSCORE,
	BOLD_STAR,
	BOLD_UNDERSCORE,
	HEADING,
	INLINE_CODE,
	ITALIC_STAR,
	ITALIC_UNDERSCORE,
	LINK,
	ORDERED_LIST,
	STRIKETHROUGH,
	Transformer,
	UNORDERED_LIST,
} from '@lexical/markdown';
import { HeadingNode } from '@lexical/rich-text';
import { Klass, LexicalNode } from 'lexical';
import { RichTextInputComponent } from '../rich-text-input.component';

export const DEFAULT_MARKDOWN_TRANSFORMERS: Transformer[] = [
	UNORDERED_LIST,
	HEADING,
	ORDERED_LIST,
	BOLD_ITALIC_STAR,
	BOLD_ITALIC_UNDERSCORE,
	BOLD_STAR,
	BOLD_UNDERSCORE,
	INLINE_CODE,
	ITALIC_STAR,
	ITALIC_UNDERSCORE,
	STRIKETHROUGH,
	LINK,
];

@Directive({
	selector: '[luRichTextPlugins]',
	standalone: true,
})
export class RichTextPluginsDirective {
	// luRichTextMarkdownPlugins = input<Transformer[] | null>(null);

	readonly richTextInputComponent = inject<RichTextInputComponent>(RichTextInputComponent);

	// transformers = linkedSignal(this.luRichTextMarkdownPlugins);

	getLexicalNodes(): Klass<LexicalNode>[] {
		return [ListItemNode, ListNode, HeadingNode, LinkNode];
	}

	constructor() {
		this.richTextInputComponent.directiveNodes = this.getLexicalNodes();
	}

	// #registeredCommands: () => void = () => {};
	// ngOnInit() {
	// 	// if (this.transformers === null) {
	// 	// 	this.transformers.set(DEFAULT_MARKDOWN_TRANSFORMERS);
	// 	// }
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
	// 	this.richTextInputComponent.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
	// 	// registerHeadings(this.richTextInputComponent.editor);
	// 	// registerLink(this.richTextInputComponent.editor);
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_LIST, 'bullet');
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_LIST, 'check');
	// 	// this.richTextInputComponent.editor.dispatchCommand(FORMAT_LIST, 'number');
	// }

	// ngOnDestroy() {
	// 	this.#registeredCommands();
	// }
}
