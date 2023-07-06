import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringTemplateOutletDirective } from '@lucca-front/ng/core';

/**
 * This is a PoC component, it's not ready for production and the string | TemplateRef logic should be set
 * in a core file instead, with its own rendering directive.
 */

type StringOrTemplate<T = unknown> = string | TemplateRef<T>;

@Component({
	selector: 'lu-page-header',
	standalone: true,
	imports: [CommonModule, StringTemplateOutletDirective],
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
	@Input()
	/**
	 * Should the page header be always visible and sticky top?
	 */
	sticky = false;

	@Input()
	/**
	 * Should the header have no shadow?
	 */
	noShadow = false;

	@Input()
	title: StringOrTemplate;

	@Input()
	actions: TemplateRef<unknown>;

	@Input()
	extra: TemplateRef<unknown>;

	@Input()
	description: StringOrTemplate;

	/**
	 * This should really not be a function for performance purpose, but again it's a PoC, it's here to demonstrate what we can do.
	 * Instead, it should be included in the StringTemplateOutlet directive
	 */
	isTemplateRef(input: StringOrTemplate): input is TemplateRef<unknown> {
		return input instanceof TemplateRef;
	}
}
