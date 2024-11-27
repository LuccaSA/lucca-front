import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { $createTextNode, $getSelection } from 'lexical';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { TagNode } from './tag-node';

@Component({
	selector: 'lu-rich-text-plugin-tag',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'tag.component.html',
	styleUrl: 'tag.component.scss',
})
export class TagComponent {
	public richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	public editor = this.richTextInputComponent.editor;

	tags = input<string[]>([]);

	constructor() {
		this.richTextInputComponent.customNodes.add(TagNode);
	}

	insertTag(text: string) {
		this.editor().update(() => {
			const selection = $getSelection();
			const node = new TagNode(text);
			selection.insertNodes([node]);
			node.insertAfter($createTextNode(' ')).selectEnd();
		});
	}
}
