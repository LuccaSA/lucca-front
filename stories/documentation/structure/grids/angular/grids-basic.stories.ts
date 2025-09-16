import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Grids/Angular/Basic',
	argTypes: {
		columns: {
			control: {
				type: 'range',
				min: 2,
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
		col: {
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
			// TODO
			options: ['spacings-0', 'spacings-50', 'spacings-100', 'spacings-150', 'spacings-200', '2px', '2ch'],
		},
		columnGap: {
			control: {
				type: 'select',
			},
			options: ['spacings-0', 'spacings-50', 'spacings-100', 'spacings-150', 'spacings-200', '2px', '2ch'],
		},
		rowGap: {
			control: {
				type: 'select',
			},
			options: ['spacings-0', 'spacings-50', 'spacings-100', 'spacings-150', 'spacings-200', '2px', '2ch'],
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
			options: [null, 'auto', 'form'],
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
	render: ({ colspan, rowspan, col, row, align, justify, repeatCols, ...args }, { argTypes }) => {
		const content = `col`;
		const columnArgs = { colspan: colspan === 1 ? null : colspan, rowspan: rowspan === 1 ? null : rowspan, col: col === 0 ? null : col, row: row === 0 ? null : row, align, justify };
		const cols = `\n <lu-grid-column>${content}</lu-grid-column>`.repeat(repeatCols);

		return {
			template: cleanupTemplate(`
<lu-grid${generateInputs(args, argTypes)}>
	<lu-grid-column${generateInputs(columnArgs, argTypes)}>${content}</lu-grid-column>${cols}
</lu-grid>`),
			styles: [
				`
		.grid-column {
			background-color: var(--palettes-neutral-100);
			padding: var(--pr-t-spacings-200);
			border-radius: 1rem;
			display: grid;
			place-items: center;
		}
		.grid-column:first-child {
			background-color: var(--palettes-neutral-700);
			color: var(--palettes-neutral-0);
		}
		`,
			],
		};
	},
} as Meta;

export const Basic: StoryObj<GridComponent & GridColumnComponent & { repeatCols: number }> = {
	args: {
		repeatCols: 11,
		columns: 12,
		mode: null,
		gap: null,
		columnGap: null,
		rowGap: null,
		colspan: 1,
		rowspan: 1,
		col: 0,
		row: 0,
		align: null,
		justify: null,
	},
};
