import { setStoryOptions } from '@/helpers/stories';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MAIN_LAYOUT_ILLUSTRATION_END_START, MAIN_LAYOUT_ILLUSTRATION_START_END, MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';

import { Meta, moduleMetadata } from '@storybook/angular-vite';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	sidebar: boolean;
	contentOverflowing: boolean;
	repeatContent: number;
	repeatOverflow: number;
	bubblesStartEnd: 1 | 2 | 3 | null;
	bubblesEndStart: 1 | 2 | 3 | null;
	illustrationStartEnd: string;
	illustrationEndStart: string;
	palette: string;
	responsive: 'wideM' | '';
}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/Basic',
	argTypes: {
		header: {
			description: 'Présente un exemple de structure avec header.',
			table: { category: 'inputs' },
		},
		headerSticky: {
			name: '↳ headerSticky',
			if: { arg: 'header', truthy: true },
			description: 'Conserve le header visible en haut du layout.',
			table: { category: 'inputs' },
		},
		footer: {
			description: 'Présente un exemple de structure avec footer.',
			table: { category: 'inputs' },
		},
		footerSticky: {
			name: '↳ footerSticky',
			if: { arg: 'footer', truthy: true },
			description: 'Conserve le footer visible en bas du layout.',
			table: { category: 'inputs' },
		},
		sidebar: {
			description: 'Présente un exemple de structure avec un panneau latéral.',
			table: { category: 'inputs' },
		},
		bubblesEndStart: {
			name: '↳ bubblesEndStart',
			options: [null, 1, 2, 3],
			control: {
				type: 'select',
			},
			if: { arg: 'sidebar', truthy: false },
			description: 'Affiche des bulles décoratives dans le coin inférieur droit.',
		},
		illustrationEndStart: {
			name: '↳ illustrationEndStart',
			options: setStoryOptions(MAIN_LAYOUT_ILLUSTRATION_END_START),
			control: {
				type: 'select',
			},
			if: { arg: 'sidebar', truthy: false },
			description: 'Affiche une illustration dans le coin inférieur droit.',
		},
		repeatContent: {
			control: { type: 'range', min: 1, max: 10 },
			description: '[Story] Modifie le nombre d’éléments <lu-main-layout-block>',
			table: { category: 'inputs' },
		},
		contentOverflowing: {
			description: 'Permet de rendre un élément <lu-main-layout-block> scrollable horizontalement tout en conservant le comportement du reste du layout.',
			table: { category: 'inputs' },
		},
		repeatOverflow: {
			name: '↳ repeatOverflow',
			control: { type: 'range', min: 1, max: 10 },
			if: { arg: 'contentOverflowing', truthy: true },
			table: { category: 'inputs' },
		},
		bubblesStartEnd: {
			options: [null, 1, 2, 3],
			control: {
				type: 'select',
			},
			description: 'Affiche des bulles décoratives dans le coin supérieur gauche.',
		},
		illustrationStartEnd: {
			options: setStoryOptions(MAIN_LAYOUT_ILLUSTRATION_START_END),
			control: {
				type: 'select',
			},
			description: 'Affiche une illustration dans le coin supérieur gauche.',
		},
		palette: {
			options: ['product', 'pagga', 'poplee', 'coreHR', 'timmi', 'cleemy', 'cc', 'brand'],
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au layout.',
		},
		responsive: {
			options: ['', 'wideM'],
			control: {
				type: 'select',
			},
			description: 'Modifie le comportement responsive du layout.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent, MainLayoutBlockComponent, ContainerComponent],
		}),
	],
	render: (args: MainLayoutAngularBasicStory) => {
		const headerContainer = args.header
			? `
		<ng-container mainLayoutHeader>
			<lu-container>
				<div class="fakeContent">header</div>
			</lu-container>
		</ng-container>`
			: ``;
		const footerContainer = args.footer
			? `
		<ng-container mainLayoutFooter>
			<lu-container>
				<div class="fakeContent">footer</div>
			</lu-container>
		</ng-container>`
			: ``;
		const headerStickyParam = args.headerSticky ? ` headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? ` footerSticky` : ``;
		const bubblesStartEndParam =
			args.bubblesStartEnd && !(args.bubblesStartEnd === 1 && args.illustrationStartEnd) ? (args.bubblesStartEnd === 1 ? ` bubblesStartEnd` : ` bubblesStartEnd="${args.bubblesStartEnd}"`) : ``;
		const bubblesEndStartParam =
			args.bubblesEndStart && !(args.bubblesEndStart === 1 && args.illustrationEndStart) ? (args.bubblesEndStart === 1 ? ` bubblesEndStart` : ` bubblesEndStart="${args.bubblesEndStart}"`) : ``;
		const illustrationStartEndParam = args.illustrationStartEnd ? ` illustrationStartEnd="${args.illustrationStartEnd}"` : ``;
		const illustrationEndStartParam = args.illustrationEndStart ? ` illustrationEndStart="${args.illustrationEndStart}"` : ``;
		const paletteParam = args.palette && args.palette !== 'none' ? ` palette="${args.palette}"` : ``;
		const responsiveParam = args.responsive ? ` responsive="${args.responsive}"` : ``;
		const sidebarContainer = args.sidebar
			? `
		<ng-container mainLayoutSidebar>sidebar</ng-container>`
			: ``;
		const template = `
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent">content</div>
			</lu-container>
		</lu-main-layout-block>`;
		const contentOverflow = `
					content overflowing`;
		let overflow = ``;
		for (let i = 1; i <= args.repeatOverflow; i++) {
			overflow = overflow + contentOverflow;
		}
		const templateOverflow = `
		<lu-main-layout-block overflow>
			<lu-container>
				<div class="fakeContent">${overflow}
				</div>
			</lu-container>
		</lu-main-layout-block>`;
		let content = ``;
		for (let i = 1; i <= args.repeatContent; i++) {
			if (i === args.repeatContent && args.contentOverflowing) {
				content = content + templateOverflow;
			} else {
				content = content + template;
			}
		}

		return {
			styles: [
				`
	@layer components {
	:host {
		.mainLayout {
			resize: vertical;
			overflow: hidden;
			min-block-size: 296px;
		}

		.mainLayout-sidebar {
			background-color: var(--palettes-neutral-50);
			align-items: center;
			justify-content: center;
			display: flex;
			flex-direction: column;
			color: var(--palettes-brand-700);
			font-family: monospace;

			&:not(:empty) {
				padding: var(--pr-t-spacings-150);
			}
		}

		.mainLayout-content-inside {
			gap: var(--pr-t-spacings-100);
		}

		.container {
			--commons-container-maxWidth: 50rem;
		}

		.fakeContent {
			background-color: var(--pr-t-elevation-surface-raised);
			border: 1px solid var(--palettes-neutral-50);
			padding: var(--pr-t-spacings-150);
			align-items: center;
			justify-content: center;
			display: flex;
			flex-direction: column;
			color: var(--palettes-brand-700);
			font-family: monospace;
			white-space: nowrap;
		}
	}
}
				`,
			],
			template: `
	<lu-main-layout${headerStickyParam}${footerStickyParam}${bubblesStartEndParam}${bubblesEndStartParam}${illustrationStartEndParam}${illustrationEndStartParam}${paletteParam}${responsiveParam}>${sidebarContainer}${headerContainer}
		${content}
		${footerContainer}
	</lu-main-layout>`,
		};
	},
} as Meta<MainLayoutAngularBasicStory>;

export const Basic = {
	args: {
		header: true,
		headerSticky: false,
		footer: true,
		footerSticky: false,
		sidebar: false,
		contentOverflowing: false,
		repeatOverflow: 5,
		repeatContent: 1,
		bubblesStartEnd: null,
		bubblesEndStart: null,
		illustrationStartEnd: '',
		illustrationEndStart: '',
		palette: 'none',
		responsive: '',
	},
};
