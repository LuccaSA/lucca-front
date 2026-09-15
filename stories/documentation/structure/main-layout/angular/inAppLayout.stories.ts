import { setStoryOptions } from '@/helpers/stories';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MAIN_LAYOUT_ILLUSTRATION_END_START, MAIN_LAYOUT_ILLUSTRATION_START_END, MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

interface MainLayoutAngularInAppLayoutStory {
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
	title: 'Documentation/Structure/Main Layout/Angular/In AppLayout',
	argTypes: {
		header: {
			description: 'Présente un exemple de structure avec header.',
			table: { category: 'inputs' },
		},
		headerSticky: {
			name: '↳ headerSticky',
			if: { arg: 'header', truthy: true },
			description: 'Fixe le footer en haut du layout.',
			table: { category: 'inputs' },
		},
		footer: {
			description: 'Présente un exemple de structure avec footer.',
			table: { category: 'inputs' },
		},
		footerSticky: {
			name: '↳ footerSticky',
			if: { arg: 'footer', truthy: true },
			description: 'Fixe le footer en bas du layout.',
			table: { category: 'inputs' },
		},
		sidebar: {
			description: 'Présente un exemple de structure avec un panneau latéral.',
			table: { category: 'inputs' },
		},
		repeatContent: {
			control: { type: 'range', min: 1, max: 10 },
			description: '[Story] Modifie le nombre d’éléments <lu-main-layout-block>',
			table: { category: 'inputs' },
		},
		contentOverflowing: {
			name: '↳ contentOverflowing',
			description: 'Permet de rendre un élément <lu-main-layout-block> scrollable horizontalement tout en conservant le comportement du reste du layout.',
			table: { category: 'inputs' },
		},
		repeatOverflow: {
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
		bubblesEndStart: {
			options: [null, 1, 2, 3],
			control: {
				type: 'select',
			},
			if: { arg: 'sidebar', truthy: false },
			description: 'Affiche des bulles décoratives dans le coin inférieur droit.',
		},
		illustrationStartEnd: {
			options: setStoryOptions(MAIN_LAYOUT_ILLUSTRATION_START_END),
			control: {
				type: 'select',
			},
			description: 'Affiche une illustration dans le coin supérieur gauche.',
		},
		illustrationEndStart: {
			options: setStoryOptions(MAIN_LAYOUT_ILLUSTRATION_END_START),
			control: {
				type: 'select',
			},
			if: { arg: 'sidebar', truthy: false },
			description: 'Affiche une illustration dans le coin inférieur droit.',
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
	render: (args: MainLayoutAngularInAppLayoutStory) => {
		const headerContainer = args.header
			? `
		<ng-container mainLayoutHeader>
			<div class="fakeContent">
				header
				<!-- <lu-page-header container /> -->
			</div>
		</ng-container>`
			: ``;
		const footerContainer = args.footer
			? `
		<ng-container mainLayoutFooter>
			<div class="fakeContent">
				footer
				<!-- <lu-footer container /> -->
			</div>
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
		<ng-container mainLayoutSidebar>
			sidebar
		</ng-container>`
			: ``;
		const template = `
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent">content</div>
			</lu-container>
		</lu-main-layout-block>`;
		const contentOverflow = `\n			content overflowing`;
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
	:host ::ng-deep {

		.appLayout {
			--components-appLayout-blockSize: 100%;
			--components-appLayout-inlineSize: 100%;
			resize: vertical;
			overflow: hidden;
			min-block-size: 394px;
			border-radius: var(--pr-t-border-radius-100);
			border: 1px solid var(--palettes-neutral-200);

			> * {
				font-family: monospace;

				&:not(.appLayout-main) {
					display: grid;
					place-items: center;
				}

				&.appLayout-banner {
					padding-block: 0;
				}

				&.appLayout-navSide {
					padding: var(--pr-t-spacings-150) var(--pr-t-spacings-400);
				}
			}
		}

		.appLayout-banner {
			background-color: var(--pr-t-elevation-surface-raised);
			box-shadow: var(--pr-t-elevation-shadow-overflow);
			position: relative;
			z-index: 2;

			&::before {
				content: '';
				position: absolute;
				inset-inline-start: var(--pr-t-spacings-100);
				inline-size: 122px;
				block-size: 32px;
				background-color: var(--palettes-neutral-50);
				border-radius: var(--pr-t-border-radius-50);
			}

			&::after {
				content: '';
				position: absolute;
				inset-inline-end: var(--pr-t-spacings-100);
				inline-size: 32px;
				block-size: 32px;
				background-color: var(--palettes-neutral-200);
				border-radius: var(--pr-t-border-radius-full);
			}
		}

		.appLayout-navSide {
			background-color: var(--palettes-neutral-500);
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
			template: `<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>
		navSide
	</ng-container>
	<lu-main-layout${headerStickyParam}${footerStickyParam}${bubblesStartEndParam}${bubblesEndStartParam}${illustrationStartEndParam}${illustrationEndStartParam}${paletteParam}${responsiveParam}>${sidebarContainer}${headerContainer}
		${content}
		${footerContainer}
	</lu-main-layout>
</lu-app-layout>
<!-- <lu-toasts /> -->
`,
		};
	},
} as Meta<MainLayoutAngularInAppLayoutStory>;

export const Basic = {
	args: {
		header: true,
		headerSticky: false,
		footer: true,
		footerSticky: true,
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
