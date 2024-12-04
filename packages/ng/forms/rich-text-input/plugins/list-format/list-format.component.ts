import { ChangeDetectionStrategy, Component, forwardRef, input, OnDestroy, signal } from '@angular/core';
import { ListType } from '@lexical/list';
import { mergeRegister } from '@lexical/utils';
import { LuccaIcon } from '@lucca-front/icons';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LexicalEditor } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { FORMAT_LIST, registerListsSelectionChange } from './list-format.command';

@Component({
	selector: 'lu-rich-text-plugin-list',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'list-format.component.html',
	styleUrl: '../styles/_buttons.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => ListFormatComponent),
		},
	],
})
export class ListFormatComponent implements OnDestroy, RichTextPluginComponent {
	public format = input.required<ListType>();
	public icon = input.required<LuccaIcon>();
	public tooltip = input.required<string>();

	public active = signal(false);

	#editor?: LexicalEditor;

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor): void {
		this.#editor = editor;
		this.#registeredCommands = mergeRegister(registerListsSelectionChange(editor, this.format(), (hasFormat) => this.active.set(hasFormat)));
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.#editor?.dispatchCommand(FORMAT_LIST, this.format());
	}
}
