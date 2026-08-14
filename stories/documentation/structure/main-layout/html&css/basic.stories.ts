import { setStoryOptions } from '@/helpers/stories';
import { HttpClientModule } from '@angular/common/http';
import { MAIN_LAYOUT_ILLUSTRATION_END_START, MAIN_LAYOUT_ILLUSTRATION_START_END } from '@lucca-front/ng/main-layout';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
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
	title: 'Documentation/Structure/Main Layout/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {
		headerSticky: {
			if: { arg: 'header', truthy: true },
		},
		footerSticky: {
			if: { arg: 'footer', truthy: true },
		},
		repeatContent: {
			control: { type: 'range', min: 1, max: 10 },
		},
		repeatOverflow: {
			control: { type: 'range', min: 1, max: 10 },
			if: { arg: 'contentOverflowing', truthy: true },
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
	render: (args: MainLayoutHTMLBasicStory) => {
		const domain = 'https://tmp.vincent-valentin.name';
		const path = '/lucca/cdn-main-layout-9/';
		const extension = '.svg';

		const illustrationStartEndUrl = args.illustrationStartEnd
			? args.illustrationStartEnd.startsWith('https://') || args.illustrationStartEnd.startsWith('/')
				? args.illustrationStartEnd
				: `${domain}${path}illustrations/startEnd/${args.illustrationStartEnd}${extension}`
			: null;
		const illustrationEndStartUrl = args.illustrationEndStart
			? args.illustrationEndStart.startsWith('https://') || args.illustrationEndStart.startsWith('/')
				? args.illustrationEndStart
				: `${domain}${path}illustrations/endStart/${args.illustrationEndStart}${extension}`
			: null;

		const bubblesIllustrationStartEnd = !args.bubblesStartEnd && args.illustrationStartEnd ? 1 : args.bubblesStartEnd;
		const bubblesIllustrationEndStart = !args.bubblesEndStart && args.illustrationEndStart ? 1 : args.bubblesEndStart;

		const bubblesStartEndContainer =
			bubblesIllustrationStartEnd || illustrationStartEndUrl
				? `
			<div class="mainLayout-bubblesStartEnd">${
				bubblesIllustrationStartEnd
					? `
				<div aria-hidden="true" [innerHtml]="'${domain}${path}bubbles/startEnd-${bubblesIllustrationStartEnd}${extension}' | luSafeExternalSvg"></div>`
					: ``
			}${
				illustrationStartEndUrl
					? `
				<img class="mainLayout-bubblesStartEnd-illustration" src="${illustrationStartEndUrl}" alt="" />`
					: ``
			}
			</div>`
				: ``;
		const bubblesEndStartContainer =
			bubblesIllustrationEndStart || illustrationEndStartUrl
				? `
			<div class="mainLayout-bubblesEndStart">${
				bubblesIllustrationEndStart
					? `
				<div aria-hidden="true" [innerHtml]="'${domain}${path}bubbles/endStart-${bubblesIllustrationEndStart}${extension}' | luSafeExternalSvg"></div>`
					: ``
			}${
				illustrationEndStartUrl
					? `
				<img class="mainLayout-bubblesEndStart-illustration" src="${illustrationEndStartUrl}" alt="" />`
					: ``
			}
			</div>`
				: ``;

		const paletteClass = args.palette && args.palette !== 'none' ? ` palette-${args.palette}` : ``;
		const responsiveClass = args.responsive ? ` mod-${args.responsive}` : ``;

		const sidebarContainer = args.sidebar
			? `
			<div class="mainLayout-sidebar">sidebar</div>`
			: ``;
		const headerStickyParam = args.headerSticky ? ` mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? ` mod-sticky` : ``;
		const headerContainer = args.header
			? `
					<div class="mainLayout-content-inside-header${headerStickyParam}">
						<div class="container">
							<div class="fakeContent">header</div>
						</div>
					</div>`
			: ``;
		const footerContainer = args.footer
			? `
					<div class="mainLayout-content-inside-footer${footerStickyParam}">
						<div class="container">
							<div class="fakeContent">footer</div>
						</div>
					</div>`
			: ``;
		const template = `
					<div class="mainLayout-content-inside-block">
						<div class="container">
							<div class="fakeContent">content</div>
						</div>
					</div>`;
		const contentOverflow = `
								content overflowing`;
		let overflow = ``;
		for (let i = 1; i <= args.repeatOverflow; i++) {
			overflow = overflow + contentOverflow;
		}
		const templateOverflow = `
					<div class="mainLayout-content-inside-block mod-overflow">
						<div class="container">
							<div class="fakeContent">${overflow}
							</div>
						</div>
					</div>`;
		let content = ``;
		for (let i = 1; i <= args.repeatContent; i++) {
			if (i === args.repeatContent && args.contentOverflowing) {
				content = content + templateOverflow;
			} else {
				content = content + template;
			}
		}

		return {
			props: args,
			styles: [
				`
@layer components {
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
		<main role="main" class="mainLayout${paletteClass}${responsiveClass}">${bubblesStartEndContainer}${bubblesEndStartContainer}${sidebarContainer}
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">${headerContainer}${content}${footerContainer}
				</div>
			</div>
		</main>
`,
		};
	},
} as Meta<MainLayoutHTMLBasicStory>;

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
