import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	effect,
	ElementRef,
	inject,
	InjectionToken,
	input,
	model,
	OnDestroy,
	OnInit,
	output,
	Signal,
	signal,
	untracked,
	viewChild,
	ViewEncapsulation,
	WritableSignal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { $canShowPlaceholderCurry, $isRootTextContentEmpty } from '@lexical/text';
import { mergeRegister } from '@lexical/utils';
import { FormFieldComponent, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { $getRoot, createEditor, Klass, LexicalEditor, LexicalNode, LexicalNodeReplacement, SKIP_DOM_SELECTION_TAG, UpdateListenerPayload } from 'lexical';
import { RICH_TEXT_FORMATTER, RichTextFormatter } from './formatters';
import { CdkPortalOutlet, DomPortal } from '@angular/cdk/portal';
import { isNil } from '@lucca-front/ng/core';

export const INITIAL_UPDATE_TAG = 'initial-update';

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
	imports: [InputDirective, CommonModule, ɵPresentationDisplayDefaultDirective, CdkPortalOutlet],
	templateUrl: './rich-text-input.component.html',
	styleUrl: './rich-text-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextInputComponent implements OnInit, OnDestroy, FormValueControl<string | null> {
	readonly #richTextFormatter = inject<RichTextFormatter>(RICH_TEXT_FORMATTER);
	readonly #formField = inject(FormFieldComponent, { optional: true });

	readonly value = model<string | null>(null);
	readonly disabled = input(false, { transform: booleanAttribute });
	readonly touch = output<void>();

	readonly placeholder = input<string>('');
	readonly disableSpellcheck = input(false, { transform: booleanAttribute });
	readonly autoResize = input(false, { transform: booleanAttribute });
	readonly hideToolbar = input(false, { transform: booleanAttribute });

	readonly content = viewChild<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});
	readonly contentPresentation = viewChild<string, ElementRef<HTMLElement>>('contentPresentation', {
		read: ElementRef,
	});
	readonly pluginComponents = contentChildren(RICH_TEXT_PLUGIN_COMPONENT, { descendants: true });
	readonly toolsProjection = viewChild.required<ElementRef<HTMLElement>>('toolsProjection');

	readonly currentCanShowPlaceholder = signal(false);
	readonly formFieldId = computed(() => this.#formField?.id());
	readonly toolsPortal = computed(() => new DomPortal(this.toolsProjection()));

	readonly #customNodes = computed(() =>
		this.pluginComponents()
			.map((c) => c.getLexicalNodes?.() ?? [])
			.flat(),
	);
	readonly #allPlugins = computed(() => this.#flattenPlugins(this.pluginComponents()));

	#lastEmittedValue?: string | null;
	#cleanup?: () => void;
	#focusedPlugin: number = 0;
	#editor?: LexicalEditor;
	#isRootElementInitialized = false;

	constructor() {
		effect(() => {
			if (this.#formField?.presentation() && this.contentPresentation()) {
				this.#editor?.setRootElement(this.contentPresentation()?.nativeElement ?? null);
				this.#editor?.setEditable(false);
			} else if (this.content()) {
				this.#editor?.setRootElement(this.content()?.nativeElement ?? null);
				this.#editor?.setEditable(!untracked(this.disabled));
			}
			this.#isRootElementInitialized = true;
		});
		effect(() => {
			const disabled = this.disabled();
			this.#editor?.setEditable(!disabled);
			this.pluginComponents().forEach((plugin) => plugin.setDisabledState(disabled));
		});
		effect(() => {
			const value = this.value();
			const editorRef = this.#editor;
			if (isNil(editorRef) || value === this.#lastEmittedValue) {
				return;
			}
			const updateTags = [SKIP_DOM_SELECTION_TAG, INITIAL_UPDATE_TAG];

			if (value) {
				editorRef.update(
					() => {
						this.#richTextFormatter.parse(editorRef, value);
					},
					{ tag: updateTags },
				);
			} else if (!editorRef.getEditorState().isEmpty()) {
				editorRef.update(
					() => {
						const root = $getRoot();
						root.clear();
					},
					{ tag: updateTags },
				);
			}
		});
	}

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
			this.#editor.registerUpdateListener((payload) => this.#onEditorUpdate(payload)),
		);

		if (this.#editor) {
			this.pluginComponents().forEach((plugin) => plugin.setEditorInstance(this.#editor!));
		}

		if (this.#allPlugins().length > 0) {
			this.#allPlugins()[this.#focusedPlugin].tabindex?.set(0);
		}
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	focusSiblingPlugin(event: Event, direction: -1 | 1) {
		event.preventDefault();
		const plugins = this.#allPlugins();

		const nextFocusedPlugin = this.#focusedPlugin + direction < 0 ? plugins.length - 1 : (this.#focusedPlugin + direction) % plugins.length;
		if (plugins[nextFocusedPlugin]?.tabindex?.()) {
			plugins[this.#focusedPlugin].tabindex?.set(-1);
			plugins[nextFocusedPlugin].tabindex?.set(0);
		}
		this.#focusedPlugin = nextFocusedPlugin;
		plugins[this.#focusedPlugin]?.focus?.();
	}

	focus() {
		this.content()?.nativeElement.focus();
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

	#onEditorUpdate({ tags, dirtyElements }: UpdateListenerPayload) {
		const isComposing = this.#editor?.isComposing();
		if (this.#isRootElementInitialized && !tags.has(INITIAL_UPDATE_TAG) && dirtyElements.size) {
			this.#editor?.read(() => {
				let result = '';
				// ignore empty nodes
				if (!$isRootTextContentEmpty(isComposing, false)) {
					result = this.#richTextFormatter.format(this.#editor);
				}
				this.touch.emit();
				this.#lastEmittedValue = result;
				this.value.set(result);
			});
		}
		const currentCanShowPlaceholder = this.#editor?.getEditorState().read($canShowPlaceholderCurry(isComposing));
		this.currentCanShowPlaceholder.set(currentCanShowPlaceholder);
	}
}
