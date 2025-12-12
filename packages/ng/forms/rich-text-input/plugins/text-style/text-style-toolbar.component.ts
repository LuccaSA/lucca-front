import { ChangeDetectionStrategy, Component, forwardRef, viewChildren } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LexicalEditor } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { TextStyleComponent } from './text-style.component';

@Component({
	selector: 'lu-rich-text-toolbar-text-style',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: `text-style-toolbar.component.html`,
	imports: [TextStyleComponent],
	host: {
		class: 'richTextField-toolbar-col-group',
	},
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TextStyleToolbarComponent),
		},
	],
})
export class TextStyleToolbarComponent implements RichTextPluginComponent {
	pluginComponents = viewChildren(RICH_TEXT_PLUGIN_COMPONENT);

	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	setEditorInstance(editor: LexicalEditor): void {
		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(editor));
	}

	setDisabledState(isDisabled: boolean): void {
		this.pluginComponents().forEach((plugin) => plugin.setDisabledState(isDisabled));
	}
}
