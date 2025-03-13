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

import { toSignal } from '@angular/core/rxjs-interop';
import { createEditor, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { map } from 'rxjs/operators';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './formatters';

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
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	readonly #richTextFormatter = inject<RichTextFormatter>(RICH_TEXT_FORMATTER);
	readonly #formField = inject(FormFieldComponent, { optional: true });
	readonly #injector = inject(Injector);

	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;
	#cleanup?: () => void;

	placeholder = input<string>('');
	disableSpeelcheck = input<boolean, boolean>(false, { transform: booleanAttribute });

	content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});
	pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });

	currentCanShowPlaceholder = signal(false);
	isDisabled = signal(false);
	isInvalid: Signal<boolean> = signal(false);
	formFieldId = computed(() => this.#formField?.id());

	#customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);
	#allPlugins = computed(() => this.#flattenPlugins(this.pluginComponents()));

	#focusedPlugin: number = 0;
	#editor?: LexicalEditor;

	ngOnInit(): void {
		const ngControl = this.#injector.get(NgControl);
		this.isInvalid = toSignal(ngControl.statusChanges.pipe(map(() => ngControl.touched && ngControl.invalid)), { injector: this.#injector });

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
					this.#onTouch?.();
					this.#onChange?.(result);
				}
				const currentCanShowPlaceholder = this.#editor.getEditorState().read($canShowPlaceholderCurry(this.#editor.isComposing()));
				this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
			}),
		);

		this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.#editor));

		this.#allPlugins()[this.#focusedPlugin].tabindex.set(0);
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(markdown: string | null): void {
		this.#editor?.update(() => {
			this.#richTextFormatter.parse(this.#editor, markdown);
		});
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
