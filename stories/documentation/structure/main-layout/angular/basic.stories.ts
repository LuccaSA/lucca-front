import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	sidebar: boolean;
	contentOverflowing: boolean;
	repeatContent: number;
	repeatOverflow: number;
}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/Basic',
	argTypes: {
		header: {
			description: 'Présente un exemple de structure avec header.',
		},
		footer: {
			description: 'Présente un exemple de structure avec footer.',
		},
		sidebar: {
			description: 'Présente un exemple de structure avec un panneau latéral.',
		},
		headerSticky: {
			if: { arg: 'header', truthy: true },
			description: 'Conserve le header visible en haut du layout.',
		},
		footerSticky: {
			if: { arg: 'footer', truthy: true },
			description: 'Conserve le footer visible en bas du layout.',
		},
		repeatContent: {
			control: { type: 'range', min: 1, max: 10 },
			description: "[Story] Modifie le nombre d'éléments <lu-main-layout-block>",
		},
		repeatOverflow: {
			control: { type: 'range', min: 1, max: 10 },
			if: { arg: 'contentOverflowing', truthy: true },
		},
		contentOverflowing: {
			description: 'Permet de rendre un élément <lu-main-layout-block> scrollable horizontalement tout en conservant le comportement du reste du layout.',
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
	<lu-main-layout${headerStickyParam}${footerStickyParam}>${sidebarContainer}${headerContainer}
		${content}
		${footerContainer}
	</lu-main-layout>`,
		};
	},
} as Meta;

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
	},
};
