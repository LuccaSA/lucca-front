import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luBooleanAttribute, LuClass, luNullableBooleanAttribute } from '@lucca-front/ng/core';
import { LU_LOADING_TRANSLATIONS } from './loading.translate';
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
	template: '<span class="loading-label"><ng-content><ng-container #defaultLabel>{{ intl().label }}</ng-container></ng-content></span>',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'loading',
		'[class.mod-block]': 'block()',
		'[class.mod-invert]': 'invert()',
		'[class.mod-L]': 'size() === "L"',
		'[class.mod-hiddenLabel]': 'isLabelHidden()',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	readonly intl = input(...intlInputOptions(LU_LOADING_TRANSLATIONS));

	readonly size = input<LoadingSize | null>(null);

	readonly invert = input(false, { transform: luBooleanAttribute });

	readonly block = input(false, { transform: luBooleanAttribute });

	readonly hiddenLabel = input(null, { transform: luNullableBooleanAttribute });

	readonly template = input<DisplayMode | null>(null);

	protected readonly defaultLabel = viewChild<ElementRef<Comment>>('defaultLabel');

	protected readonly isLabelHidden = computed(() => this.hiddenLabel() ?? !!this.defaultLabel());

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
