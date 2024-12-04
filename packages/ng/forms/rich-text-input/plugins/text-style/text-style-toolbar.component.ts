import { ChangeDetectionStrategy, Component, forwardRef, viewChildren } from '@angular/core';
import { LexicalEditor } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { TextStyleComponent } from './text-style.component';

@Component({
	selector: 'lu-rich-text-toolbar-text-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-rich-text-plugin-text-style icon="formatTextItalic" tooltip="Italique" format="italic" />
		<lu-rich-text-plugin-text-style icon="formatTextBold" tooltip="Gras" format="bold" />
		<lu-rich-text-plugin-text-style icon="formatTextUnderline" tooltip="Underline" format="underline" />`,
	imports: [TextStyleComponent],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TextStyleToolbarComponent),
		},
	],
})
export class TextStyleToolbarComponent implements RichTextPluginComponent {
	pluginComponents = viewChildren(TextStyleComponent);

	setEditorInstance(editor: LexicalEditor): void {
		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(editor));
	}
}
