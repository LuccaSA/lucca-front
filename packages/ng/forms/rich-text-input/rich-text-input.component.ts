import {
	AfterViewInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	ElementRef,
	forwardRef,
	inject,
	InjectionToken,
	Injector,
	input,
	OnDestroy,
	OnInit,
	Signal,
	signal,
	viewChild,
	ViewEncapsulation,
	WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';

import { $canShowPlaceholderCurry } from '@lexical/text';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { $getRoot, createEditor, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './formatters';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface RichTextPluginComponent {
	setEditorInstance(editor: LexicalEditor): void;
	getLexicalNodes?(): Klass<LexicalNode>[];
	setDisabledState(isDisabled: boolean): void;

	//embedded plugins
	pluginComponents?: Signal<readonly RichTextPluginComponent[]>;

	// accessibility
	tabindex?: WritableSignal<number>;
	focus?(): void;
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
export class RichTextInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
	readonly #richTextFormatter = inject<RichTextFormatter>(RICH_TEXT_FORMATTER);
	readonly #formField = inject(FormFieldComponent, { optional: true });
	readonly #injector = inject(Injector);

	readonly placeholder = input<string>('');
	readonly disableSpellcheck = input<boolean, boolean>(false, { transform: booleanAttribute });
	readonly autoResize = input<boolean, boolean>(false, { transform: booleanAttribute });

	readonly content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});
	readonly pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });

	readonly currentCanShowPlaceholder = signal(false);
	readonly isDisabled = signal(false);
	readonly formFieldId = computed(() => this.#formField?.id());
	readonly isError = computed(() => this.#isInvalid() && this.#isTouched());

	readonly #customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);
	readonly #allPlugins = computed(() => this.#flattenPlugins(this.pluginComponents()));
	readonly #isTouched = signal(false);

	#isInvalid: Signal<boolean> = signal(false);

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;
	#focusedPlugin: number = 0;
	#editor?: LexicalEditor;

	ngOnInit(): void {
		this.#editor = createEditor({
			theme: {
				text: {
					strikethrough: 'u-textDecorationLineThrough',
					bold: 'u-fontWeightBold',
					italic: 'u-fontStyleItalic',
					underline: 'u-textDecorationUnderline',
				},
			},
			nodes: [...this.#customNodes()],
		});

		this.#editor.setRootElement(this.content().nativeElement);
		this.#cleanup = mergeRegister(
			registerRichText(this.#editor),
			registerHistory(this.#editor, createEmptyHistoryState(), 300),
			this.#editor.registerUpdateListener((changes) => {
				if (changes.dirtyElements.size) {
					const result = this.#richTextFormatter.format(this.#editor);
					this.touch();
					this.#onChange?.(result);
				}
				const currentCanShowPlaceholder = this.#editor.getEditorState().read($canShowPlaceholderCurry(this.#editor.isComposing()));
				this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
			}),
		);

		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.#editor));

		if (this.#allPlugins().length > 0) {
			this.#allPlugins()[this.#focusedPlugin].tabindex.set(0);
		}
	}

	ngAfterViewInit() {
		const ngControl = this.#injector.get(NgControl);

		if (ngControl.statusChanges) {
			this.#isInvalid = toSignal(ngControl.statusChanges.pipe(map(() => ngControl.invalid)), {
				injector: this.#injector,
				initialValue: ngControl.invalid,
			});
		}
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(markdown: string | null): void {
		if (markdown) {
			this.#editor?.update(() => {
				this.#richTextFormatter.parse(this.#editor, markdown);
			});
		} else if (!this.#editor?.getEditorState().isEmpty()) {
			this.#editor.update(() => {
				const root = $getRoot();
				root.clear();
			});
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

	focusSiblingPlugin(direction: -1 | 1) {
		const plugins = this.#allPlugins();

		plugins[this.#focusedPlugin].tabindex.set(-1);
		this.#focusedPlugin = this.#focusedPlugin + direction < 0 ? plugins.length - 1 : (this.#focusedPlugin + direction) % plugins.length;
		plugins[this.#focusedPlugin].tabindex.set(0);
		plugins[this.#focusedPlugin].focus();
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
