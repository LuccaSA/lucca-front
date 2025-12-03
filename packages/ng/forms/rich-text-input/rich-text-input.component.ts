import { CommonModule } from '@angular/common';
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
import { $canShowPlaceholderCurry } from '@lexical/text';
import { mergeRegister } from '@lexical/utils';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { $getRoot, createEditor, Klass, LexicalEditor, LexicalNode, LexicalNodeReplacement } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './formatters';

export const INITIAL_UPDATE_TAG = 'initial-update';
// TODO replace by lexical import when upgrade lexical
export const SKIP_DOM_SELECTION_TAG = 'skip-dom-selection';

export interface RichTextPluginComponent {
	setEditorInstance(editor: LexicalEditor): void;
	getLexicalNodes?(): (Klass<LexicalNode> | LexicalNodeReplacement)[];
	setDisabledState(isDisabled: boolean): void;

	//embedded plugins
	pluginComponents?: Signal<readonly RichTextPluginComponent[]>;

	// accessibility
	// Rich Text Input sets tabindex to -1 on all plugins except the first one
	tabindex?: WritableSignal<number>;
	// What to do in the plugin when it receives focus from the editor
	focus?(): void;
}

export const RICH_TEXT_PLUGIN_COMPONENT = new InjectionToken<RichTextPluginComponent>('RichTextPlugin');

@Component({
	selector: 'lu-rich-text-input',
	imports: [InputDirective, CommonModule],
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
	readonly #richTextFormatter = inject<RichTextFormatter>(RICH_TEXT_FORMATTER);
	readonly #formField = inject(FormFieldComponent, { optional: true });

	readonly placeholder = input<string>('');
	readonly disableSpellcheck = input(false, { transform: booleanAttribute });
	readonly autoResize = input(false, { transform: booleanAttribute });
	readonly hideToolbar = input(false, { transform: booleanAttribute });

	readonly content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});
	readonly pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });

	readonly currentCanShowPlaceholder = signal(false);
	readonly isDisabled = signal(false);
	readonly formFieldId = computed(() => this.#formField?.id());

	readonly #customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);
	readonly #allPlugins = computed(() => this.#flattenPlugins(this.pluginComponents()));
	readonly #isTouched = signal(false);

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;
	#focusedPlugin: number = 0;
	#editor?: LexicalEditor;

	ngOnInit(): void {
		this.#editor = createEditor({
			theme: {
				text: {
					strikethrough: 'pr-u-textDecorationLineThrough',
					bold: 'pr-u-fontWeightBold',
					italic: 'pr-u-fontStyleItalic',
					underline: 'pr-u-textDecorationUnderline',
				},
			},
			nodes: [...this.#customNodes()],
		});

		this.#cleanup = mergeRegister(
			this.#richTextFormatter.registerTextPlugin(this.#editor),
			registerHistory(this.#editor, createEmptyHistoryState(), 300),
			this.#editor.registerUpdateListener(({ tags, dirtyElements }) => {
				if (!tags.has(INITIAL_UPDATE_TAG) && dirtyElements.size) {
					const result = this.#richTextFormatter.format(this.#editor);
					this.touch();
					this.#onChange?.(result);
				}
				const currentCanShowPlaceholder = this.#editor.getEditorState().read($canShowPlaceholderCurry(this.#editor.isComposing()));
				this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
			}),
		);
		this.#editor.setRootElement(this.content().nativeElement);

		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.#editor));

		if (this.#allPlugins().length > 0) {
			this.#allPlugins()[this.#focusedPlugin].tabindex?.set(0);
		}
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(value: string | null): void {
		const updateTags = [SKIP_DOM_SELECTION_TAG, INITIAL_UPDATE_TAG];
		if (value) {
			this.#editor?.update(
				() => {
					this.#richTextFormatter.parse(this.#editor, value);
				},
				{ tag: updateTags },
			);
		} else if (!this.#editor?.getEditorState().isEmpty()) {
			this.#editor.update(
				() => {
					const root = $getRoot();
					root.clear();
				},
				{ tag: updateTags },
			);
		}
	}

	registerOnChange(onChange: (markdown: string | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouch: () => void): void {
		this.#onTouch = onTouch;
	}

	setDisabledState(isDisabled: boolean): void {
		this.#editor?.setEditable(!isDisabled);
		this.isDisabled.set(isDisabled);
		this.pluginComponents().forEach((c) => c.setDisabledState(isDisabled));
	}

	focusSiblingPlugin(event: Event, direction: -1 | 1) {
		event.preventDefault();
		const plugins = this.#allPlugins();

		const nextFocusedPlugin = this.#focusedPlugin + direction < 0 ? plugins.length - 1 : (this.#focusedPlugin + direction) % plugins.length;
		if (plugins[nextFocusedPlugin].tabindex) {
			plugins[this.#focusedPlugin].tabindex?.set(-1);
			plugins[nextFocusedPlugin].tabindex.set(0);
		}
		this.#focusedPlugin = nextFocusedPlugin;
		plugins[this.#focusedPlugin].focus();
	}

	focus() {
		this.content().nativeElement.focus();
	}

	touch() {
		this.#isTouched.set(true);
		this.#onTouch?.();
	}

	#flattenPlugins(plugins: readonly RichTextPluginComponent[]): RichTextPluginComponent[] {
		return plugins.flatMap((p) => {
			if (p.pluginComponents) {
				return this.#flattenPlugins(p.pluginComponents());
			} else {
				return p;
			}
		});
	}
}
