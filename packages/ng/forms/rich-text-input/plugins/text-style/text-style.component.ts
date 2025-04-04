import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, input, OnDestroy, signal, viewChild } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FORMAT_TEXT_COMMAND, LexicalEditor, SELECTION_CHANGE_COMMAND, TextFormatType } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { registerFormatSelectionChange } from './text-style.command';

@Component({
	selector: 'lu-rich-text-plugin-text-style',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './text-style.component.html',
	styleUrl: './text-style.component.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	host: {
		class: 'richTextField-toolbar-col-group',
	},
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TextStyleComponent),
		},
	],
})
export class TextStyleComponent implements OnDestroy, RichTextPluginComponent {
	public format = input.required<TextFormatType>();
	public icon = input.required<LuccaIcon>();
	public tooltip = input.required<string>();

	public tabindex = signal<number>(-1);
	public active = signal(false);
	public isDisabled = signal(false);

	public element = viewChild('element', { read: ElementRef<HTMLButtonElement> });

	#editor?: LexicalEditor;

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor): void {
		this.#editor = editor;
		this.#registeredCommands = registerFormatSelectionChange(this.#editor, this.format(), (hasFormat) => this.active.set(hasFormat));
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	dispatchCommand() {
		this.#editor.dispatchCommand(FORMAT_TEXT_COMMAND, this.format());
		// force update selection
		this.#editor.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled.set(isDisabled);
	}

	focus() {
		(this.element() as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}
}
