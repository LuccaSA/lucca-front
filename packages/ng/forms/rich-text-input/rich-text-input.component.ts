import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	ElementRef,
	forwardRef,
	inject,
	InjectionToken,
	input,
	OnDestroy,
	OnInit,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';

import { $canShowPlaceholderCurry } from '@lexical/text';
import { createEditor, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_FORMATER, RichTextFormater } from './rich-text-formater';

export interface RichTextPluginComponent {
	setEditorInstance(editor: LexicalEditor): void;
	getLexicalNodes?(): Klass<LexicalNode>[];
}

export const RICH_TEXT_PLUGIN_COMPONENT = new InjectionToken<RichTextPluginComponent>('RichTextPlugin');

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	readonly richTextFormater: RichTextFormater = inject(RICH_TEXT_FORMATER);
	readonly placeholder = input('');

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;

	editor?: LexicalEditor;

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	currentCanShowPlaceholder = signal(false);

	customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);

	pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });

	ngOnInit(): void {
		this.editor = createEditor({
			theme: {
				text: {
					strikethrough: 'editorTheme__textStrikethrough',
					bold: 'editorTheme__textBold',
					italic: 'editorTheme__textItalic',
					underline: 'editorTheme__textUnderline',
				},
			},
			nodes: [...this.customNodes()],
		});

		this.editor.setRootElement(this.content().nativeElement);
		this.#cleanup = mergeRegister(
			registerRichText(this.editor),
			registerHistory(this.editor, createEmptyHistoryState(), 300),
			this.editor.registerUpdateListener((changes) => {
				if (changes.dirtyElements.size) {
					this.richTextFormater
						.format(this.editor)
						.then((markdown) => {
							this.#onTouch?.();
							this.#onChange?.(markdown);
						})
						.catch(() => void 0);
				}
				const currentCanShowPlaceholder = this.editor.getEditorState().read($canShowPlaceholderCurry(this.editor.isComposing()));
				this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
			}),
		);

		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.editor));
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(markdown: string | null): void {
		this.editor?.update(() => {
			this.richTextFormater
				.parse(this.editor, markdown)
				.then(() => {})
				.catch(() => {});
		});
	}

	registerOnChange(onChange: (markdown: string | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouch: () => void): void {
		this.#onTouch = onTouch;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.editor?.setEditable(!isDisabled);
	}
}
