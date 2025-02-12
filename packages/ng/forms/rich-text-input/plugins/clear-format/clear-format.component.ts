import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { CLEAR_FORMAT, registerClearFormat } from './clear-format.command';
import { LexicalEditor } from 'lexical';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';

@Component({
	selector: 'lu-rich-text-plugin-clear-format',
	templateUrl: 'clear-format.component.html',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	public setEditorInstance(editor: LexicalEditor) {
		this.#editor = editor;
		this.#registeredCommands = registerClearFormat(editor);
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.#editor.dispatchCommand(CLEAR_FORMAT, undefined);
	}
}
