import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { $createTextNode, $getSelection } from 'lexical';
import { TagNode } from '../../tag-node';
import { LexicalEditorProvider } from '../../editor.provider';

@Component({
	selector: 'lu-rich-text-plugin-tag',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'tag.component.html',
	styleUrl: 'tag.component.scss',
})
export class TagComponent {
	editor = inject(LexicalEditorProvider).editor;

	tags = input<string[]>([]);

	insertTag(text: string) {
		this.editor().update(() => {
			const selection = $getSelection();
			const node = new TagNode(text);
			selection.insertNodes([node]);
			node.insertAfter($createTextNode(' ')).selectEnd();
		});
	}
}
