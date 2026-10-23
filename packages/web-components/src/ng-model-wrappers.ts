import { ChangeDetectionStrategy, Component, Directive, ElementRef, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { RichTextInputComponent, RichTextInputToolbarComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
import { ELEMENT_PAGE_CONTENT } from './element-component';

/*
 * Some form components only work with `ngModel` on their own host, or with an attribute directive: these wrappers are
 * registered under the component's tag and render the real component with them. The real component, rendered by Angular,
 * is not turned into a custom element again (see `define-element.ts`).
 *
 * They are value accessors themselves, so that the custom element handles them as any form component: `value`,
 * `valueChange`, `required` and the form field states.
 */
@Directive({
	host: {
		style: 'display: contents',
		'(focusout)': 'onTouched()',
	},
})
abstract class NgModelWrapper<T> implements ControlValueAccessor {
	protected readonly value = signal<T | null>(null);

	#onChange: (value: T | null) => void = () => {};
	protected onTouched: () => void = () => {};

	protected modelChange(value: T | null): void {
		this.value.set(value);
		this.#onChange(value);
	}

	writeValue(value: T | null): void {
		this.value.set(value);
	}

	registerOnChange(onChange: (value: T | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}
}

@Component({
	selector: 'lu-web-components-color-input',
	imports: [ColorInputComponent, FormsModule],
	template: `<lu-color-input [colors]="colors()" [clearable]="clearable()" [compact]="compact()" [ngModel]="value()" (ngModelChange)="modelChange($event)" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ColorInputElementComponent), multi: true }],
})
export class ColorInputElementComponent extends NgModelWrapper<ColorOption> {
	/**
	 * Colors to choose from
	 */
	readonly colors = input.required<ColorOption[]>();

	/**
	 * Allows to clear the value
	 */
	readonly clearable = input(false, { transform: luBooleanAttribute });

	/**
	 * Compact display
	 */
	readonly compact = input(false, { transform: luBooleanAttribute });
}

type RichTextFormatter = 'html' | 'markdown' | 'markdownTags' | 'plainTextTags';

// Attributes of the formatter directives, as written on `lu-rich-text-input`
const FORMATTER_ATTRIBUTES: [string, RichTextFormatter][] = [
	['luWithMarkdownFormatter', 'markdown'],
	['luWithMarkdownTagsFormatter', 'markdownTags'],
	['luWithPlainTextTagsFormatter', 'plainTextTags'],
	['luWithHtmlFormatter', 'html'],
];

@Component({
	selector: 'lu-web-components-rich-text-input',
	imports: [
		RichTextInputComponent,
		RichTextInputToolbarComponent,
		FormsModule,
		HtmlFormatterDirective,
		MarkdownFormatterDirective,
		MarkdownFormatterWithTagsDirective,
		PlainTextFormatterWithTagsDirective,
	],
	template: `
		@switch (formatter) {
			@case ('markdown') {
				<lu-rich-text-input
					luWithMarkdownFormatter
					[placeholder]="placeholder()"
					[disableSpellcheck]="disableSpellcheck()"
					[autoResize]="autoResize()"
					[hideToolbar]="hideToolbar() || !toolbar"
					[ngModel]="value()"
					(ngModelChange)="modelChange($event)"
				>
					<lu-rich-text-input-toolbar />
				</lu-rich-text-input>
			}
			@case ('markdownTags') {
				<lu-rich-text-input
					luWithMarkdownTagsFormatter
					[placeholder]="placeholder()"
					[disableSpellcheck]="disableSpellcheck()"
					[autoResize]="autoResize()"
					[hideToolbar]="hideToolbar() || !toolbar"
					[ngModel]="value()"
					(ngModelChange)="modelChange($event)"
				>
					<lu-rich-text-input-toolbar />
				</lu-rich-text-input>
			}
			@case ('plainTextTags') {
				<lu-rich-text-input
					luWithPlainTextTagsFormatter
					[placeholder]="placeholder()"
					[disableSpellcheck]="disableSpellcheck()"
					[autoResize]="autoResize()"
					[hideToolbar]="hideToolbar() || !toolbar"
					[ngModel]="value()"
					(ngModelChange)="modelChange($event)"
				>
					<lu-rich-text-input-toolbar />
				</lu-rich-text-input>
			}
			@default {
				<lu-rich-text-input
					luWithHtmlFormatter
					[placeholder]="placeholder()"
					[disableSpellcheck]="disableSpellcheck()"
					[autoResize]="autoResize()"
					[hideToolbar]="hideToolbar() || !toolbar"
					[ngModel]="value()"
					(ngModelChange)="modelChange($event)"
				>
					<lu-rich-text-input-toolbar />
				</lu-rich-text-input>
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RichTextInputElementComponent), multi: true }],
})
export class RichTextInputElementComponent extends NgModelWrapper<string> {
	readonly #host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	// Static, as the attribute directive it stands for
	protected readonly formatter: RichTextFormatter = FORMATTER_ATTRIBUTES.find(([attribute]) => this.#host.hasAttribute(attribute))?.[1] ?? 'html';

	/**
	 * Whether the page put a `lu-rich-text-input-toolbar` in it, as in the Angular template. The toolbar is always
	 * rendered, hidden otherwise: the editor, created on init, needs the nodes of its plugins.
	 */
	protected readonly toolbar = inject(ELEMENT_PAGE_CONTENT).some((node) => node.nodeName === 'LU-RICH-TEXT-INPUT-TOOLBAR');

	/**
	 * Placeholder of the editor
	 */
	readonly placeholder = input('');

	/**
	 * Disables the browser spellcheck
	 */
	readonly disableSpellcheck = input(false, { transform: luBooleanAttribute });

	/**
	 * Grows with its content
	 */
	readonly autoResize = input(false, { transform: luBooleanAttribute });

	/**
	 * Hides the toolbar
	 */
	readonly hideToolbar = input(false, { transform: luBooleanAttribute });
}
