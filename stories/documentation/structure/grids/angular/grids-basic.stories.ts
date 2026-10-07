import { GRID_COLUMN_ALIGNMENT, GRID_GAP, GRID_MODE, GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';

const OTHER_GAP = ['1px', '2em', '3%'];

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
			description: 'Nombre de colonnes de la grille (ignoré si <code>mode</code> est renseigné).',
			table: { category: 'inputs (grid)' },
		},
		gridColspan: {
			name: 'colspan',
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
			description: 'Nombre de colonnes occupées par défaut par chaque colonne de la grille.',
			table: { category: 'inputs (grid)' },
		},
		gridRowspan: {
			name: 'rowspan',
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
			description: 'Nombre de lignes occupées par défaut par chaque colonne de la grille.',
			table: { category: 'inputs (grid)' },
		},
		container: {
			description: 'Encapsule la grille dans un container : les configurations responsive s’appuient alors sur des container queries plutôt que sur des media queries.',
			table: { category: 'inputs (grid)' },
		},
		colspan: {
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
			description: 'Nombre de colonnes occupées par la première colonne (surcharge le <code>colspan</code> de la grille).',
			table: { category: 'inputs (grid-column)' },
		},
		rowspan: {
			control: {
				type: 'range',
				min: 1,
				max: 12,
			},
			description: 'Nombre de lignes occupées par la première colonne (surcharge le <code>rowspan</code> de la grille).',
			table: { category: 'inputs (grid-column)' },
		},
		column: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
			description: 'Colonne de départ de la première colonne.',
			table: { category: 'inputs (grid-column)' },
		},
		row: {
			control: {
				type: 'range',
				min: 0,
				max: 12,
			},
			description: 'Ligne de départ de la première colonne.',
			table: { category: 'inputs (grid-column)' },
		},
		gap: {
			control: {
				type: 'select',
			},

			options: setStoryOptions([...GRID_GAP, ...OTHER_GAP]),
			description: 'Espacement entre les lignes et les colonnes (token d’espacement ou longueur CSS).',
			table: { category: 'inputs (grid)' },
		},
		columnGap: {
			control: {
				type: 'select',
			},
			options: setStoryOptions([...GRID_GAP, ...OTHER_GAP]),
			description: 'Espacement entre les colonnes (token d’espacement ou longueur CSS).',
			table: { category: 'inputs (grid)' },
		},
		rowGap: {
			control: {
				type: 'select',
			},
			options: setStoryOptions([...GRID_GAP, ...OTHER_GAP]),
			description: 'Espacement entre les lignes (token d’espacement ou longueur CSS).',
			table: { category: 'inputs (grid)' },
		},
		align: {
			control: {
				type: 'select',
			},
			options: setStoryOptions(GRID_COLUMN_ALIGNMENT),
			description: 'Alignement vertical du contenu de la première colonne.',
			table: { category: 'inputs (grid-column)' },
		},
		justify: {
			control: {
				type: 'select',
			},
			options: setStoryOptions(GRID_COLUMN_ALIGNMENT),
			description: 'Alignement horizontal du contenu de la première colonne.',
			table: { category: 'inputs (grid-column)' },
		},
		mode: {
			control: {
				type: 'select',
			},
			options: setStoryOptions(GRID_MODE),
			description: 'Mode de disposition de la grille.',
			table: { category: 'inputs (grid)' },
		},

		repeatCols: {
			control: {
				type: 'range',
				min: 0,
				max: 35,
			},
			description: '[Story] Nombre de colonnes supplémentaires affichées.',
			table: { category: 'story' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [GridComponent, GridColumnComponent],
		}),
	],
	render: ({ colspan, rowspan, column, row, align, justify, repeatCols, semantic, gridColspan, gridRowspan, ...args }, { argTypes }) => {
		const content = `col`;
		const columnArgs = {
			colspan: colspan === 1 ? null : colspan,
			rowspan: rowspan === 1 ? null : rowspan,
			column: column === 0 ? null : column,
			row: row === 0 ? null : row,
			align,
			justify,
		};
		const gridSpanArgs = `${gridColspan > 1 ? ` colspan="${gridColspan}"` : ``}${gridRowspan > 1 ? ` rowspan="${gridRowspan}"` : ``}`;
		const cols = `\n <lu-grid-column>${content}</lu-grid-column>`.repeat(repeatCols);
		const colsSemantic = `\n <dd lu-grid-column>${content}</dd>`.repeat(repeatCols);

		const style = [
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
		];

		if (semantic) {
			return {
				styles: style,
				template: cleanupTemplate(`<dl class="pr-u-descriptionListReset" lu-grid${generateInputs(args, argTypes)}${gridSpanArgs}>
	<dt lu-grid-column${generateInputs(columnArgs, argTypes)}>story</dt>${colsSemantic}
</dl>`),
			};
		} else {
			return {
				styles: style,
				template: cleanupTemplate(`<lu-grid${generateInputs(args, argTypes)}${gridSpanArgs}>
	<lu-grid-column${generateInputs(columnArgs, argTypes)}>story</lu-grid-column>${cols}
</lu-grid>`),
			};
		}
	},
} as Meta;

export const Basic: StoryObj<GridComponent & GridColumnComponent & { repeatCols: number; semantic: boolean; gridColspan: number; gridRowspan: number }> = {
	args: {
		semantic: false,
		columns: 6,
		repeatCols: 10,
		container: false,
		gridColspan: 1,
		gridRowspan: 1,
		colspan: 1,
		rowspan: 1,
		column: 0,
		row: 0,
	},
};
