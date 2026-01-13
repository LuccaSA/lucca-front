import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-footer',
	styleUrl: './footer.component.scss',
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	/**
	 * Footer sticks to the bottom of the page
	 */
	readonly sticky = input(false, { transform: booleanAttribute });

	/**
	 * Apply a container around the content
	 */
	readonly container = input(false, { transform: booleanAttribute });

	/**
	 * Force the narrow mode by default (overrides narrowAtMediaMax)
	 */
	readonly forceNarrow = input(false, { transform: booleanAttribute });

	/**
	 * Apply specific classes when the footer is inside a dialog
	 */
	readonly dialog = input(false, { transform: booleanAttribute });

	/**
	 * Define the breakpoint for switching to narrow. XSS by default to M
	 */
	readonly narrowAtMediaMax = input<'XXS' | 'XS' | 'S' | 'M'>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
