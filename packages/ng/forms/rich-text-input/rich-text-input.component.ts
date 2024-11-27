import { Component, ElementRef, forwardRef, OnDestroy, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import { CommandPayloadType, createEditor, Klass, LexicalCommand, LexicalEditor, LexicalNode } from 'lexical';

@Component({
	selector: 'lu-rich-text-input',
	standalone: true,
	imports: [],
	templateUrl: './rich-text-input.component.html',
	styleUrl: './rich-text-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RichTextInputComponent),
			multi: true,
		},
	],
})
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;

	editor = signal<LexicalEditor | null>(null);

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	customNodes = new Set<Klass<LexicalNode>>();

	ngOnInit(): void {
		this.editor.set(
			createEditor({
				theme: {
					text: {
						strikethrough: 'editorTheme__textStrikethrough',
						bold: 'editorTheme__textBold',
						italic: 'editorTheme__textItalic',
						underline: 'editorTheme__textUnderline',
					},
				},
				nodes: [...this.customNodes],
			}),
		);

		this.editor().setRootElement(this.content().nativeElement);
		this.#cleanup = mergeRegister(
			registerRichText(this.editor()),
			// registerCtrlEnterShortcut(this.editor, () => this.ctrlEnter.emit()),
			// Sync editor state with ngControlValue
			this.editor().registerUpdateListener(() =>
				this.editor()
					.getEditorState()
					.read(() => {
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
		this.editor().update(() => {
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
		this.editor().setEditable(!isDisabled);
	}

	onKeyDown(_$event: KeyboardEvent) {
		// later
	}

	dispatchCommand<T extends LexicalCommand<unknown>>($event: Event, type: T, payload: CommandPayloadType<T>) {
		$event.preventDefault();
		this.editor().dispatchCommand(type, payload);
	}
}
