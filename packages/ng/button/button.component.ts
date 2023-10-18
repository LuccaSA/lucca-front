import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, OnChanges } from '@angular/core';
import { NgClazz, Palette } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton]', // a[luButton]?
	standalone: true,
	hostDirectives: [NgClazz],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'button',
	},
})
export class ButtonComponent implements OnChanges {
	#ngClazz = inject(NgClazz);

	@Input()
	size: 'M' | 'S' | 'XS' = 'M';

	@Input({
		transform: booleanAttribute,
	})
	block = false;

	// Q: Global palette or specific one for button?
	@Input()
	palette: Palette = 'none';

	// Q: disabled state matching is-disabled class, can't we just style from state being disabled?
	@Input()
	state: 'default' | 'loading' | 'error' | 'success' | 'disabled' = 'default';

	// Q: Rename this to something else? conflicts with native style input name
	@Input()
	luButton: 'default' | 'outlined' | 'text' | 'text-invert' = 'default';

	ngOnChanges(): void {
		const ngClassConfig = {
			[`mod-${this.size}`]: true,
			[`mod-block`]: this.block,
			[`palette-${this.palette}`]: true,
			[`is-${this.state}`]: true,
		};
		if (this.luButton !== 'default') {
			if (this.luButton === 'text-invert') {
				ngClassConfig['mod-text'] = true;
				ngClassConfig['mod-invert'] = true;
			} else {
				ngClassConfig[`mod-${this.luButton}`] = true;
			}
		}
		this.#ngClazz.ngClass = ngClassConfig;
	}
}
