import { ChangeDetectionStrategy, Component, forwardRef, input, OnDestroy, signal } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FORMAT_TEXT_COMMAND, LexicalEditor, SELECTION_CHANGE_COMMAND, TextFormatType } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { registerFormatSelectionChange } from './text-style.command';

@Component({
	selector: 'lu-rich-text-plugin-text-style',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './text-style.component.html',
	styleUrl: '../styles/_buttons.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
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

	public active = signal(false);
	#editor?: LexicalEditor;

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor): void {
		this.#editor = editor;
		this.#registeredCommands = registerFormatSelectionChange(this.#editor, this.format(), (hasFormat) => this.active.set(hasFormat));
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.#editor.dispatchCommand(FORMAT_TEXT_COMMAND, this.format());
		// force update selection
		this.#editor.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
	}
}
