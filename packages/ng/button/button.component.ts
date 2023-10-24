import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, OnChanges } from '@angular/core';
import { NgClazz, Palette } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton],a[luButton]',
	standalone: true,
	hostDirectives: [NgClazz],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	@Input()
	palette: Palette = 'none';

	@Input()
	state: 'default' | 'loading' | 'error' | 'success' = 'default';

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
