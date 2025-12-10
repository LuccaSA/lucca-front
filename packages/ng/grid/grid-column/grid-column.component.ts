import { ChangeDetectionStrategy, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ResponsiveConfig } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-grid-column, [lu-grid-column]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'grid-column',
		'[style]': 'style()',
	},
})
export class GridColumnComponent {
	readonly colspan = input(null, { transform: numberAttribute });
	readonly rowspan = input(null, { transform: numberAttribute });
	readonly column = input(null, { transform: numberAttribute });
	readonly row = input(null, { transform: numberAttribute });
	readonly align = input<'start' | 'center' | 'end' | 'auto' | null>(null);
	readonly justify = input<'start' | 'center' | 'end' | 'auto' | null>(null);

	readonly responsive = input<ResponsiveConfig<'row' | 'column' | 'rowspan' | 'colspan', number>>({});

	readonly style = computed(() => {
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
