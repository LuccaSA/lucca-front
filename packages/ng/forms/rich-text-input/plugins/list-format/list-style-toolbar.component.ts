import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ListFormatComponent } from './list-format.component';
import { ListItemNode, ListNode } from '@lexical/list';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { registerListsGlobal } from './list-format.command';
import { mergeRegister } from '@lexical/utils';

@Component({
	selector: 'lu-rich-text-toolbar-list-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-rich-text-plugin-list format="bullet" tooltip="Bullets" icon="formatBulletedList" />
		<lu-rich-text-plugin-list format="number" tooltip="Numbered" icon="formatNumberedList" />`,
	imports: [ListFormatComponent],
})
export class ListStyleToolbarComponent implements OnInit {
	public richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	public editor = this.richTextInputComponent.editor;

	constructor() {
		this.richTextInputComponent.customNodes.add(ListNode);
		this.richTextInputComponent.customNodes.add(ListItemNode);
	}
	#registeredCommands: () => void = () => {};

	public ngOnInit() {
		this.#registeredCommands = mergeRegister(registerListsGlobal(this.editor()));
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}
}
