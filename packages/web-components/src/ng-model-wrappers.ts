import { ChangeDetectionStrategy, Component, ElementRef, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
 */

@Component({
	selector: 'lu-web-components-color-input',
	imports: [ColorInputComponent, FormsModule],
	template: `<lu-color-input [colors]="colors()" [clearable]="clearable()" [compact]="compact()" [ngModel]="value()" (ngModelChange)="value.set($event)" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { style: 'display: contents' },
})
export class ColorInputElementComponent {
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

	/**
	 * The selected color
	 */
	readonly value = model<ColorOption | null>(null);
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
					(ngModelChange)="value.set($event)"
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
					(ngModelChange)="value.set($event)"
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
					(ngModelChange)="value.set($event)"
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
					(ngModelChange)="value.set($event)"
				>
					<lu-rich-text-input-toolbar />
				</lu-rich-text-input>
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { style: 'display: contents' },
})
export class RichTextInputElementComponent {
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

	/**
	 * The formatted content (HTML, Markdown or plain text, depending on the formatter)
	 */
	readonly value = model<string | null>(null);
}
