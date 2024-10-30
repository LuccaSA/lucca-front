import { Component, ElementRef, OnDestroy, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { createEditor } from 'lexical';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerFormatOptions } from './commands';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';

@Component({
	selector: 'lu-text-input',
	standalone: true,
	imports: [],
	templateUrl: './rich-text-input.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	#onChange?: (markdown: string) => void;
	#onTouch?: () => void;

	editor = createEditor({
		nodes: [HeadingNode, QuoteNode, AutoLinkNode, LinkNode],
	});

	#cleanup?: () => void;

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	ngOnInit(): void {
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

	writeValue(markdown: string): void {
		this.editor.update(() => {
			$convertFromMarkdownString(markdown, TRANSFORMERS);
		});
	}

	registerOnChange(onChange: (markdown: string) => void): void {
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
}
