import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { $createTextNode, $getSelection, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { TagNode } from './tag-node';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from "../../rich-text-input.translate";

@Component({
	selector: 'lu-rich-text-plugin-tag',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'tag.component.html',
	styleUrl: 'tag.component.scss',
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TagComponent),
		},
	],
})
export class TagComponent implements RichTextPluginComponent {
	tags = input<string[]>([]);

	editor: LexicalEditor | null = null;

	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;
	}

	getLexicalNodes(): Array<Klass<LexicalNode>> {
		return [TagNode];
	}

	insertTag(text: string) {
		this.editor.update(() => {
			const selection = $getSelection();
			const node = new TagNode(text);
			selection.insertNodes([node]);
			node.insertAfter($createTextNode(' ')).selectEnd();
		});
	}
}
