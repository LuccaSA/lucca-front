import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective, luBooleanAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ButtonComponent } from '@lucca/prisme/button';
import { FieldsetSize } from './fieldset.type';

let nextId = 0;

@Component({
	selector: 'lu-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrl: './fieldset.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective, NgTemplateOutlet, IconComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetComponent {
	/**
	 * Title of the fieldset, displayed in its legend
	 */
	readonly heading = input<PortalContent | null>(null);
	/**
	 * Helper text displayed next to the title
	 */
	readonly helper = input<PortalContent | null>(null);
	/**
	 * Action displayed next to the title, ignored when `expandable` is true
	 */
	readonly action = input<PortalContent | null>(null);
	/**
	 * Size of the fieldset
	 */
	readonly size = input<FieldsetSize | null>(null);
	/**
	 * Displays the legend and the content side by side
	 */
	readonly horizontal = input(false, { transform: luBooleanAttribute });
	/**
	 * Makes the title a button that expands or collapses the content
	 */
	readonly expandable = input(false, { transform: luBooleanAttribute });
	/**
	 * Visually hides the legend, which remains available to assistive technologies
	 */
	readonly hiddenLegend = input(false, { transform: luBooleanAttribute });

	/**
	 * Whether the content is expanded, only applies when `expandable` is true
	 */
	readonly expanded = model(false);

	id = `fieldsetTitleContent${nextId++}`;
}
