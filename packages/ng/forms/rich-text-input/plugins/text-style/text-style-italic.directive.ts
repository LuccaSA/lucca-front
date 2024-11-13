import { RichTextEditorPluginDirective } from '../plugin.model';
import { Directive, inject, OnInit } from '@angular/core';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { TextStyleComponent } from './text-style.component';

@Directive({
	selector: '[luWithItalicPlugin]',
	standalone: true,
})
export class TextStyleItalicDirective implements RichTextEditorPluginDirective, OnInit {
	richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	customNodes = [];

	ngOnInit() {
		const comp = this.richTextInputComponent.toolbar().createComponent(TextStyleComponent);
		comp.setInput('format', 'italic');
		comp.setInput('icon', 'formatTextItalic');
		comp.setInput('tooltip', 'Italique');
	}
}
