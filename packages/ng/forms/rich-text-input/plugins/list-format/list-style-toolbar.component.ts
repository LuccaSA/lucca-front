import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, viewChildren } from '@angular/core';
import { mergeRegister } from '@lexical/utils';
import { Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { registerListsGlobal } from './list-format.command';

import { ListItemNode, ListNode } from '@lexical/list';
import { ListFormatComponent } from './list-format.component';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';

@Component({
	selector: 'lu-rich-text-toolbar-list-style',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: `list-style-toolbar.component.html`,
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => ListStyleToolbarComponent),
		},
	],
	imports: [ListFormatComponent],
})
export class ListStyleToolbarComponent implements OnDestroy, RichTextPluginComponent {
	#registeredCommands: () => void = () => {};

	pluginComponents = viewChildren(ListFormatComponent);

	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	setEditorInstance(editor: LexicalEditor): void {
		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(editor));
		this.#registeredCommands = mergeRegister(registerListsGlobal(editor));
	}
	getLexicalNodes?(): Klass<LexicalNode>[] {
		return [ListNode, ListItemNode];
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}
}
