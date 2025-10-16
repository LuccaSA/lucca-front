import { Component, inject, input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-status-badge',
	standalone: true,
	template: '{{label()}}',
	styleUrl: './statusBadge.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'statusBadge',
	},
})
export class StatusBadgeComponent implements OnChanges {
	#luClass = inject(LuClass);

	label = input.required<string>();

	size = input<'L' | 'M'>('M');

	palette = input<Palette | null>(null);

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette(), [`mod-${this.size()}`]: true });
	}
}
