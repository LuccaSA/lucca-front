import { ChangeDetectionStrategy, Component, forwardRef, viewChildren } from '@angular/core';
import { TextStyleToolbarComponent } from '../text-style';
import { DividerComponent } from '../../../../divider/divider.component';
import { ListStyleToolbarComponent } from '../list-format';
import { HeadingsComponent } from '../headings';
import { LinkComponent } from '../link';
import { ClearFormatComponent } from '../clear-format';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { Klass, LexicalEditor, LexicalNode } from 'lexical';

@Component({
	selector: 'lu-rich-text-input-toolbar',
	templateUrl: 'toolbar.component.html',
	styleUrl: 'toolbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [TextStyleToolbarComponent, DividerComponent, ListStyleToolbarComponent, HeadingsComponent, LinkComponent, ClearFormatComponent],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => RichTextInputToolbarComponent),
		},
	],
})
export class RichTextInputToolbarComponent implements RichTextPluginComponent {
	pluginComponents = viewChildren(RICH_TEXT_PLUGIN_COMPONENT);

	setEditorInstance(editor: LexicalEditor): void {
		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(editor));
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		return this.pluginComponents().reduce((acc, plugin) => [...acc, ...(plugin.getLexicalNodes?.() || [])], [] as Klass<LexicalNode>[]);
	}
}
