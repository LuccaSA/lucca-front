import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Grids/Angular/Basic',
	argTypes: {
		columns: {
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
			if: { arg: 'mode', truthy: false },
		},
		colspan: {
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
		},
		rowspan: {
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
		},
		column: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
		},
		row: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
		},
		gap: {
			control: {
				type: 'select',
			},

			options: ['0', '25', '50', '75', '100', '150', '200', '300', '400', '500', '600', '700', '800', '1px', '2em', '3%'],
		},
		columnGap: {
			control: {
				type: 'select',
			},
			options: ['0', '25', '50', '75', '100', '150', '200', '300', '400', '500', '600', '700', '800', '1px', '2em', '3%'],
		},
		rowGap: {
			control: {
				type: 'select',
			},
			options: ['0', '25', '50', '75', '100', '150', '200', '300', '400', '500', '600', '700', '800', '1px', '2em', '3%'],
		},
		align: {
			control: {
				type: 'select',
			},
			options: [null, 'start', 'center', 'end'],
		},
		justify: {
			control: {
				type: 'select',
			},
			options: [null, 'start', 'center', 'end'],
		},
		mode: {
			control: {
				type: 'select',
			},
			options: [null, 'form', 'auto'],
		},

		repeatCols: {
			control: {
				type: 'range',
				min: 0,
				max: 35,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GridComponent, GridColumnComponent],
		}),
	],
	render: ({ colspan, rowspan, column, row, align, justify, repeatCols, container, ...args }, { argTypes }) => {
		const content = `col`;
		const columnArgs = {
			colspan: colspan === 1 ? null : colspan,
			rowspan: rowspan === 1 ? null : rowspan,
			column: column === 0 ? null : column,
			row: row === 0 ? null : row,
			align,
			justify,
		};
		const cols = `\n <lu-grid-column>${content}</lu-grid-column>`.repeat(repeatCols);

		return {
			styles: [
				`
		.grid-column {
			background-color: var(--palettes-neutral-100);
			padding: var(--pr-t-spacings-50);
			min-block-size: var(--pr-t-spacings-600);
			min-inline-size: var(--pr-t-spacings-600);
			border-radius: var(--pr-t-border-radius-default);
			display: grid;
			place-items: center;
			overflow: hidden;

			&:first-child {
				background-color: var(--palettes-neutral-700);
				color: var(--palettes-neutral-0);
			}
		}
		:host ::ng-deep .grid-containerWrapper {
			overflow: hidden;
			resize: horizontal;
			max-inline-size: 100%;
			min-inline-size: 25rem;
		}
		`,
			],
			template: cleanupTemplate(`<lu-grid${generateInputs(args, argTypes)}>
	<lu-grid-column${generateInputs(columnArgs, argTypes)}>story</lu-grid-column>${cols}
</lu-grid>`),
		};
	},
} as Meta;

export const Basic: StoryObj<GridComponent & GridColumnComponent & { repeatCols: number }> = {
	args: {
		columns: 6,
		repeatCols: 10,
		mode: null,
		gap: null,
		columnGap: null,
		rowGap: null,
		colspan: 1,
		rowspan: 1,
		column: 0,
		row: 0,
		align: null,
		justify: null,
	},
};
