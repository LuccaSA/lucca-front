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
		responsiveMediaConfig: {
			if: { arg: 'container', eq: false },
		},
		responsiveContainerConfig: {
			if: { arg: 'container', eq: true },
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
			options: [
				null,
				'form',
				'auto',
				'autoAtMediaMinXXXS',
				'autoAtMediaMinXXS',
				'autoAtMediaMinXS',
				'autoAtMediaMinS',
				'autoAtMediaMinM',
				'autoAtMediaMinL',
				'autoAtMediaMinXL',
				'autoAtMediaMinXXL',
				'autoAtMediaMinXXXL',
				'autoAtContainerMinXXXS',
				'autoAtContainerMinXXS',
				'autoAtContainerMinXS',
				'autoAtContainerMinS',
				'autoAtContainerMinM',
				'autoAtContainerMinL',
				'autoAtContainerMinXL',
				'autoAtContainerMinXXL',
				'autoAtContainerMinXXXL',
			],
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
	render: ({ colspan, rowspan, column, row, align, justify, repeatCols, container, rwd, responsiveMediaConfig, responsiveContainerConfig, ...args }, { argTypes }) => {
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
		const containerArg = container ? ` container` : ``;
		const responsiveConfig = rwd ? (container ? responsiveContainerConfig : responsiveMediaConfig) : ``;
		const rwdArg = rwd ? ` [responsive]="responsiveSample"` : ``;
		const rwdContent = rwd ? `rwd` : `col`;
		const rwdStyle = rwd
			? `.grid-column {
	&:last-child {
		background-color: var(--palettes-neutral-700);
		color: var(--palettes-neutral-0);
	}
}`
			: ``;

		return {
			styles: [
				rwdStyle,
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
				background-color: var(--palettes-brand-700);
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
			template: cleanupTemplate(`${responsiveConfig}
<lu-grid${containerArg}${generateInputs(args, argTypes)}>
	<lu-grid-column${generateInputs(columnArgs, argTypes)}>story</lu-grid-column>${cols}
	<lu-grid-column${rwdArg}>${rwdContent}</lu-grid-column>
</lu-grid>`),
		};
	},
} as Meta;

export const Basic: StoryObj<GridComponent & GridColumnComponent & { repeatCols: number; rwd: boolean; responsiveMediaConfig: string; responsiveContainerConfig: string }> = {
	args: {
		rwd: false,
		container: false,
		responsiveMediaConfig: `@let responsiveSample = {
	colspanAtMediaMinXXS: 3,
	rowAtMediaMinXXS: 1,
	rowspanAtMediaMinXS: 2,
	columnAtMediaMinS: 2,
};
`,
		responsiveContainerConfig: `@let responsiveSample = {
	colspanAtContainerMinXXS: 3,
	rowAtContainerMinXXS: 1,
	rowspanAtContainerMinXS: 2,
	columnAtContainerMinS: 2,
};
`,
		mode: null,
		columns: 6,
		repeatCols: 10,
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
