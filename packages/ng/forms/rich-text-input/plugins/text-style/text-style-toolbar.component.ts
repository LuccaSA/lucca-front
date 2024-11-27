import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextStyleComponent } from './text-style.component';

@Component({
	selector: 'lu-rich-text-toolbar-text-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-rich-text-plugin-text-style icon="formatTextItalic" tooltip="Italique" format="italic" />
		<lu-rich-text-plugin-text-style icon="formatTextBold" tooltip="Gras" format="bold" />
		<lu-rich-text-plugin-text-style icon="formatTextUnderline" tooltip="Underline" format="underline" />`,
	imports: [TextStyleComponent],
})
export class TextStyleToolbarComponent {}
