import { Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-status-badge',
	standalone: true,
	template: '{{label}}',
	styleUrls: ['./statusBadge.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'statusBadge',
	},
})
export class StatusBadgeComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input({ required: true })
	label: string;

	@Input()
	size: 'M' | 'L' = 'M';

	@Input()
	palette: Palette = null;

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette}`]: !!this.palette, [`mod-${this.size}`]: !!this.size });
	}
}
