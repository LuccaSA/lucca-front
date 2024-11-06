import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, TextFormatType } from 'lexical';
import { LuccaIcon } from '@lucca-front/icons';
import { registerFormatSelectionChange } from './text-style.command';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LexicalEditorProvider } from '../../editor.provider';

@Component({
	selector: 'lu-rich-text-plugin-text-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './text-style.component.html',
	styleUrl: '../styles/_buttons.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
})
export class TextStyleComponent implements OnInit, OnDestroy {
	public editor = inject(LexicalEditorProvider).editor;

	public format = input.required<TextFormatType>();
	public icon = input.required<LuccaIcon>();
	public tooltip = input<string>();

	public active = signal(false);

	#registeredCommands: () => void = () => {};

	public ngOnInit() {
		this.#registeredCommands = registerFormatSelectionChange(this.editor(), this.format(), (hasFormat) => this.active.set(hasFormat));
	}
	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.editor().dispatchCommand(FORMAT_TEXT_COMMAND, this.format());
		// force update selection
		this.editor().dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
	}
}
