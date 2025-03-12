import {
	booleanAttribute,
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
	Signal,
	signal,
	viewChild,
	ViewEncapsulation,
	WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';

import { $canShowPlaceholderCurry } from '@lexical/text';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';

import { createEditor, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './formatters';

export interface RichTextPluginComponent {
	setEditorInstance(editor: LexicalEditor): void;
	getLexicalNodes?(): Klass<LexicalNode>[];

	tabindex?: WritableSignal<number>;
	focus?(): void;

	pluginComponents?: Signal<readonly RichTextPluginComponent[]>;
}

export const RICH_TEXT_PLUGIN_COMPONENT = new InjectionToken<RichTextPluginComponent>('RichTextPlugin');

@Component({
	selector: 'lu-rich-text-input',
	standalone: true,
	imports: [InputDirective],
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
	readonly richTextFormatter = inject<RichTextFormatter>(RICH_TEXT_FORMATTER);
	readonly placeholder = input('');
	readonly #formField = inject(FormFieldComponent, { optional: true });

	allPlugins: RichTextPluginComponent[];
	focusedPlugin: number = 0;

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;

	editor?: LexicalEditor;

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	currentCanShowPlaceholder = signal(false);
	disabled = input<boolean, boolean>(false, { transform: booleanAttribute });
	error = input<boolean, boolean>(false, { transform: booleanAttribute });

	customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);

	pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });

	formFieldId = computed(() => this.#formField?.id());

	ngOnInit(): void {
		this.editor = createEditor({
			theme: {
				text: {
					strikethrough: 'u-textDecorationLineThrough',
					bold: 'u-fontWeightBold',
					italic: 'u-fontStyleItalic',
					underline: 'u-textDecorationUnderline',
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
					const result = this.richTextFormatter.format(this.editor);
					this.#onTouch?.();
					this.#onChange?.(result);
				}
				const currentCanShowPlaceholder = this.editor.getEditorState().read($canShowPlaceholderCurry(this.editor.isComposing()));
				this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
			}),
		);

		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.editor));

		this.allPlugins = this.findPlugins(this.pluginComponents());

		this.allPlugins[this.focusedPlugin].tabindex.set(0);
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	findPlugins(plugins: readonly RichTextPluginComponent[]): RichTextPluginComponent[] {
		return plugins.flatMap((p) => {
			if (p.pluginComponents) {
				return this.findPlugins(p.pluginComponents());
			} else {
				return p;
			}
		});
	}

	writeValue(markdown: string | null): void {
		this.editor?.update(() => {
			this.richTextFormatter.parse(this.editor, markdown);
		});
	}

	registerOnChange(onChange: (markdown: string | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouch: () => void): void {
		this.#onTouch = onTouch;
	}

	// TODO ?
	setDisabledState?(isDisabled: boolean): void {
		this.editor?.setEditable(!isDisabled);
	}

	focusSiblingPlugin(direction: -1 | 1) {
		this.allPlugins[this.focusedPlugin].tabindex.set(-1);
		this.focusedPlugin = this.focusedPlugin + direction < 0 ? this.allPlugins.length - 1 : (this.focusedPlugin + direction) % this.allPlugins.length;
		this.allPlugins[this.focusedPlugin].tabindex.set(0);
		this.allPlugins[this.focusedPlugin].focus();
	}
}
