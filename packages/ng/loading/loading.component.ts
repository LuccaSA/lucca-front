import { ChangeDetectionStrategy, Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, LuClass } from '@lucca-front/ng/core';
import { LoadingSize } from './loading.type';

type DisplayMode =
	| 'popin'
	| 'drawer'
	| 'fullPage'
	/** @deprecated use 'fullPage' instead */
	| 'fullpage';

@Component({
	selector: 'lu-loading',
	providers: [LuClass],
	styleUrl: './loading.component.scss',
	template: '<span class="loading-label"><ng-content /></span>',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'loading',
		'[class.mod-block]': 'block()',
		'[class.mod-invert]': 'invert()',
		'[class.mod-L]': 'size() === "L"',
		'[class.mod-hiddenLabel]': 'hiddenLabel()',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	/**
	 * Which size should the loading be? Size L also applies the block mode
	 */
	readonly size = input<LoadingSize | null>(null);

	/**
	 * Invert the loading colors for use on a dark background
	 */
	readonly invert = input(false, { transform: luBooleanAttribute });

	/**
	 * Center the loading in its container (full page, dialog, section…)
	 */
	readonly block = input(false, { transform: luBooleanAttribute });

	/**
	 * Visually hide the label, keeping it for screen readers
	 */
	readonly hiddenLabel = input(false, { transform: luBooleanAttribute });

	/**
	 * Apply a layout adapted to a specific context (popin, drawer, full page)
	 */
	readonly template = input<DisplayMode | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
