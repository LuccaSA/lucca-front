import { RichTextEditorPluginDirective } from '../plugin.model';
import { Directive, inject, input, OnInit } from '@angular/core';
import { TagNode } from '../../tag-node';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { TagComponent } from './tag.component';

@Directive({
	selector: '[luWithTagsPlugin]',
	standalone: true,
})
export class TagDirective implements RichTextEditorPluginDirective, OnInit {
	richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	customNodes = [TagNode];

	tags = input.required<string[]>({ alias: 'luWithTagsPlugin' });

	constructor() {
		this.richTextInputComponent.customNodes.add(this.customNodes[0]);
	}

	ngOnInit() {
		const comp = this.richTextInputComponent.toolbar().createComponent(TagComponent);
		comp.setInput('tags', this.tags());
	}
}
