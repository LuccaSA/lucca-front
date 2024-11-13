import { RichTextEditorPluginDirective } from '../plugin.model';
import { Directive, inject } from '@angular/core';
import { LexicalNode } from 'lexical';
import { TagNode } from '../../tag-node';
import { HostDirective } from '../host.directive';

@Directive({
	selector: '[luWithTagsPlugin]',
	standalone: true,
})
export class TagDirective implements RichTextEditorPluginDirective {
	hostDirective = inject(HostDirective);

	getCustomNodes(): (typeof LexicalNode)[] {
		return [TagNode];
	}

	constructor() {
		this.hostDirective.registerLexicalNode(this.getCustomNodes());
	}
}
