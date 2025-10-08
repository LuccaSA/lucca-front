import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Grids/Angular/Responsive',
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
		modeMedia: {
			if: { arg: 'container', eq: false },
			control: {
				type: 'select',
			},
			options: [
				null,
				'autoAtMediaMinXXXS',
				'autoAtMediaMinXXS',
				'autoAtMediaMinXS',
				'autoAtMediaMinS',
				'autoAtMediaMinM',
				'autoAtMediaMinL',
				'autoAtMediaMinXL',
				'autoAtMediaMinXXL',
				'autoAtMediaMinXXXL',
			],
		},
		modeContainer: {
			if: { arg: 'container', eq: true },
			control: {
				type: 'select',
			},
			options: [
				null,
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
				max: 34,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GridComponent, GridColumnComponent],
		}),
	],
	render: ({ repeatCols, container, responsiveMediaConfig, responsiveContainerConfig, modeMedia, modeContainer, mode, ...args }, { argTypes }) => {
		const content = `col`;
		const cols = `\n <lu-grid-column>${content}</lu-grid-column>`.repeat(repeatCols);
		const modeArg = container ? (modeContainer === null ? `` : ` mode="${modeContainer}"`) : modeMedia === null ? `` : ` mode="${modeMedia}"`;
		const containerArg = container ? ` container` : ``;
		const responsiveConfig = container ? responsiveContainerConfig : responsiveMediaConfig;

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

			&:nth-child(1) {
				background-color: var(--palettes-neutral-700);
				color: var(--palettes-neutral-0);
			}

			&:nth-child(2) {
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
<lu-grid${containerArg}${modeArg}${generateInputs(args, argTypes)}>
	<lu-grid-column [responsive]="responsiveSample">rwd</lu-grid-column>
	<lu-grid-column [responsive]="{ columnAtContainerMinS: 1, rowAtContainerMinS: 1 }">rwd</lu-grid-column>${cols}
</lu-grid>`),
		};
	},
} as Meta;

export const Basic: StoryObj<
	GridComponent & GridColumnComponent & { modeMedia: boolean; modeContainer: boolean; repeatCols: number; responsiveMediaConfig: string; responsiveContainerConfig: string }
> = {
	args: {
		columns: 6,
		repeatCols: 10,
		container: false,
		modeMedia: null,
		modeContainer: null,
		responsiveMediaConfig: `@let responsiveSample = {
	colspanAtMediaMinXXS: 3,
	rowAtMediaMinXXS: 1,
	rowspanAtMediaMinXS: 2,
	columnAtMediaMinS: 2,
};`,
		responsiveContainerConfig: `@let responsiveSample = {
	colspanAtContainerMinXXS: 3,
	rowAtContainerMinXXS: 1,
	rowspanAtContainerMinXS: 2,
	columnAtContainerMinS: 2,
};`,
	},
};
