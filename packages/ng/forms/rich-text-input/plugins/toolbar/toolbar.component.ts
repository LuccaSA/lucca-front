import { ChangeDetectionStrategy, Component, forwardRef, viewChildren } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { ClearFormatComponent } from '../clear-format';
import { HeadingsComponent } from '../headings';
import { LinkComponent } from '../link';
import { ListStyleToolbarComponent } from '../list-format';
import { TextStyleToolbarComponent } from '../text-style';

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

	setDisabledState(isDisabled: boolean): void {
		this.pluginComponents().forEach((plugin) => plugin.setDisabledState(isDisabled));
	}
}
