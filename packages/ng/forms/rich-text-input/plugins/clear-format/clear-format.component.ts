import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, OnDestroy, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LexicalEditor } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { CLEAR_FORMAT, registerClearFormat } from './clear-format.command';

@Component({
	selector: 'lu-rich-text-plugin-clear-format',
	templateUrl: 'clear-format.component.html',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'richTextField-toolbar-col-group',
	},
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => ClearFormatComponent),
		},
	],
})
export class ClearFormatComponent implements RichTextPluginComponent, OnDestroy {
	#editor?: LexicalEditor;
	#registeredCommands: () => void = () => {};

	readonly intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	readonly element = viewChild('element', { read: ElementRef<HTMLButtonElement> });

	readonly tabindex = signal<number>(-1);
	readonly isDisabled = signal(false);

	setEditorInstance(editor: LexicalEditor) {
		this.#editor = editor;
		this.#registeredCommands = registerClearFormat(editor);
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	dispatchCommand() {
		this.#editor.dispatchCommand(CLEAR_FORMAT, undefined);
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled.set(isDisabled);
	}

	focus() {
		(this.element() as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}
}
