import { Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ResponsiveConfig } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-grid-column, [lu-grid-column]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'grid-column',
		'[style]': 'style()',
	},
})
export class GridColumnComponent {
	colspan = input(null, { transform: numberAttribute });
	rowspan = input(null, { transform: numberAttribute });
	column = input(null, { transform: numberAttribute });
	row = input(null, { transform: numberAttribute });
	align = input<'start' | 'center' | 'end' | 'auto' | null>(null);
	justify = input<'start' | 'center' | 'end' | 'auto' | null>(null);

	responsive = input<ResponsiveConfig<'row' | 'column' | 'rowspan' | 'colspan', number>>({});

	style = computed(() => {
		return {
			'--grid-colspan': this.colspan(),
			'--grid-rowspan': this.rowspan(),
			'--grid-column': this.column(),
			'--grid-row': this.row(),
			'--grid-align': this.align(),
			'--grid-justify': this.justify(),
			...Object.entries(this.responsive()).reduce((acc, [key, value]) => {
				return {
					...acc,
					[`--grid-${key}`]: value,
				};
			}, {}),
		};
	});
}
