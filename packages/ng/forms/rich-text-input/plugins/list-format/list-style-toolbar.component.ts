import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, viewChildren } from '@angular/core';
import { mergeRegister } from '@lexical/utils';
import { Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { registerListsGlobal } from './list-format.command';

import { ListItemNode, ListNode } from '@lexical/list';
import { ListFormatComponent } from './list-format.component';

@Component({
	selector: 'lu-rich-text-toolbar-list-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-rich-text-plugin-list format="bullet" tooltip="Bullets" icon="formatBulletedList" />
		<lu-rich-text-plugin-list format="number" tooltip="Numbered" icon="formatNumberedList" />`,
	imports: [ListFormatComponent],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => ListStyleToolbarComponent),
		},
	],
})
export class ListStyleToolbarComponent implements OnDestroy, RichTextPluginComponent {
	#registeredCommands: () => void = () => {};

	pluginComponents = viewChildren(ListFormatComponent);

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
