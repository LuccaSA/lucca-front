import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuccaIcon } from '@lucca-front/icons';
import { ListType } from '@lexical/list';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { FORMAT_LIST, registerListsSelectionChange } from './list-format.command';
import { mergeRegister } from '@lexical/utils';

@Component({
	selector: 'lu-rich-text-plugin-list',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'list-format.component.html',
	styleUrl: '../styles/_buttons.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
})
export class ListFormatComponent implements OnInit, OnDestroy {
	public richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	public editor = this.richTextInputComponent.editor;

	public format = input.required<ListType>();
	public icon = input.required<LuccaIcon>();
	public tooltip = input.required<string>();

	public active = signal(false);

	#registeredCommands: () => void = () => {};

	public ngOnInit() {
		this.#registeredCommands = mergeRegister(registerListsSelectionChange(this.editor(), this.format(), (hasFormat) => this.active.set(hasFormat)));
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.editor().dispatchCommand(FORMAT_LIST, this.format());
	}
}
