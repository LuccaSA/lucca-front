import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, input, OnDestroy, signal, viewChild } from '@angular/core';
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
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'list-format.component.html',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	host: {
		class: 'richText-toolbar-col-group',
	},
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

	public element = viewChild('element', { read: ElementRef<HTMLButtonElement> });

	public tabindex = signal<number>(-1);
	public active = signal(false);
	public isDisabled = signal(false);

	#editor?: LexicalEditor;

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor): void {
		this.#editor = editor;
		this.#registeredCommands = mergeRegister(registerListsSelectionChange(editor, this.format(), (hasFormat) => this.active.set(hasFormat)));
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled.set(isDisabled);
	}

	dispatchCommand() {
		this.#editor?.dispatchCommand(FORMAT_LIST, this.format());
	}

	focus() {
		(this.element() as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}
}
