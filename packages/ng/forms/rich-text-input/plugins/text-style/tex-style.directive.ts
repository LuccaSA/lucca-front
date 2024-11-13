import { RichTextEditorPluginDirective } from '../plugin.model';
import { Directive, inject } from '@angular/core';
import { LexicalNode } from 'lexical';
import { HostDirective } from '../host.directive';
import { HeadingNode } from '@lexical/rich-text';

@Directive({
	selector: '[luWithTextStylePlugin]',
	standalone: true,
})
export class TextStyleDirective implements RichTextEditorPluginDirective {
	hostDirective = inject(HostDirective);

	getCustomNodes(): (typeof LexicalNode)[] {
		return [HeadingNode];
	}

	constructor() {
		this.hostDirective.registerLexicalNode(this.getCustomNodes());
	}
}
