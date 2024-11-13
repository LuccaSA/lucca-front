import { Component, ElementRef, forwardRef, inject, OnDestroy, OnInit, viewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { CommandPayloadType, createEditor, FORMAT_TEXT_COMMAND, LexicalCommand, LexicalEditor, LexicalNode } from 'lexical';
import { CLEAR_FORMAT, FORMAT_HEADINGS, FORMAT_LINK, FORMAT_QUOTE, registerFormatOptions } from './commands';
import { LexicalEditorProvider } from './editor.provider';

@Component({
	selector: 'lu-rich-text-input',
	standalone: true,
	imports: [ButtonComponent, IconComponent],
	templateUrl: './rich-text-input.component.html',
	styleUrl: './rich-text-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RichTextInputComponent),
			multi: true,
		},
		LexicalEditorProvider,
	],
})
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	#editorProvider = inject(LexicalEditorProvider);

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;

	readonly commands = {
		FORMAT_TEXT_COMMAND,
		FORMAT_HEADINGS,
		FORMAT_QUOTE,
		FORMAT_LINK,
		CLEAR_FORMAT,
	};

	editor?: LexicalEditor;

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	customNodes = new Set<typeof LexicalNode>();
	toolbar = viewChild.required('toolbar', { read: ViewContainerRef });

	ngOnInit(): void {
		this.editor = createEditor({
			theme: {
				text: {
					strikethrough: 'editorTheme__textStrikethrough',
					bold: 'editorTheme__textBold',
					italic: 'editorTheme__textItalic',
				},
			},
			nodes: [...this.customNodes],
		});

		this.#editorProvider.editor.set(this.editor);
		this.editor.setRootElement(this.content().nativeElement);
		this.#cleanup = mergeRegister(
			registerRichText(this.editor),
			registerHistory(this.editor, createEmptyHistoryState(), 300),
			registerFormatOptions(this.editor),
			// registerCtrlEnterShortcut(this.editor, () => this.ctrlEnter.emit()),
			// Sync editor state with ngControlValue
			this.editor.registerUpdateListener(() =>
				this.editor.getEditorState().read(() => {
					this.#onTouch?.();
					this.#onChange?.($convertToMarkdownString(TRANSFORMERS));
				}),
			),
		);
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(markdown: string | null): void {
		this.editor.update(() => {
			$convertFromMarkdownString(markdown ?? '', TRANSFORMERS);
		});
	}

	registerOnChange(onChange: (markdown: string | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouch: () => void): void {
		this.#onTouch = onTouch;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.editor.setEditable(!isDisabled);
	}

	onKeyDown(_$event: KeyboardEvent) {
		// later
	}

	dispatchCommand<T extends LexicalCommand<unknown>>($event: Event, type: T, payload: CommandPayloadType<T>) {
		$event.preventDefault();
		this.editor.dispatchCommand(type, payload);
	}
}
