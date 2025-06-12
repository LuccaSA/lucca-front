import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularInAppLayoutStory {
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
	title: 'Documentation/Structure/Main Layout/Angular/In AppLayout',
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
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent, MainLayoutBlockComponent],
		}),
	],
	render: (args: MainLayoutAngularInAppLayoutStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader><div class="container"><div class="fakeContent">header</div></div></ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter><div class="container"><div class="fakeContent">footer</div></div></ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const sidebarContainer = args.sidebar ? `<ng-container mainLayoutSidebar>sidebar</ng-container>` : ``;
		const template = `<lu-main-layout-block>
	<div class="container">
		<div class="fakeContent">
			content
		</div>
	</div>
</lu-main-layout-block>`;
		const contentOverflow = ` content overflowing`;
		let overflow = ``;
		for (let i = 1; i <= args.repeatOverflow; i++) {
			overflow = overflow + contentOverflow;
		}
		const templateOverflow = `<lu-main-layout-block overflow>
			<div class="container">
				<div class="fakeContent">
					${overflow}
				</div>
			</div>
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
:host ::ng-deep {
	.appLayout {
		--components-appLayout-blockSize: 100%;
		--components-appLayout-inlineSize: 100%;
		resize: vertical;
		overflow: hidden;
		min-block-size: 298px;
		border-radius: var(--commons-borderRadius-L);
		border: 1px solid var(--palettes-neutral-200);

		> * {
			font-family: monospace;
			padding-block: var(--pr-t-spacings-300);

			&:not(.appLayout-main) {
				display: grid;
				place-items: center;
			}

			&.appLayout-banner {
				padding-block: 0;
			}

			&.appLayout-navSide {
				padding-inline: var(--pr-t-spacings-400);
			}
		}
	}

	.appLayout-banner {
		background-color: var(--pr-t-elevation-surface-raised);
		box-shadow: var(--pr-t-elevation-shadow-overflow);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			inset-inline-start: var(--pr-t-spacings-100);
			width: 122px;
			height: 32px;
			background-color: var(--palettes-neutral-50);
			border-radius: var(--commons-borderRadius-M);
		}

		&::after {
			content: '';
			position: absolute;
			inset-inline-end: var(--pr-t-spacings-100);
			width: 32px;
			height: 32px;
			background-color: var(--palettes-neutral-200);
			border-radius: var(--commons-borderRadius-full);
		}
	}

	.appLayout-navSide {
		background-color: var(--palettes-neutral-500);
	}

	.mainLayout {
		@media (width < 50em) {
			gap: var(--pr-t-spacings-300);
		}
	}

	.mainLayout-sidebar {
		background-color: var(--pr-t-elevation-surface-raised);
		border: 1px solid var(--palettes-neutral-50);
		padding: var(--pr-t-spacings-150);
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		color: var(--palettes-brand-700);
		font-family: monospace;

		@media (width >= 50em) {
				margin-left: var(--pr-t-spacings-400);
		}

		@media (width < 50em) {
			max-width: 46rem;
			margin-inline: 2rem;
		}

		@media (width < 40em) {
			margin-inline: 1rem;
		}
	}

	.mainLayout-content-inside {
		gap: var(--pr-t-spacings-300);
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
				`,
			],
			template: cleanupTemplate(`<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>
		navSide
	</ng-container>
	<lu-main-layout ${headerStickyParam} ${footerStickyParam}>
		${sidebarContainer}
		${headerContainer}
		<ng-container mainLayoutContent>
			${content}
		</ng-container>
		${footerContainer}
	</lu-main-layout>
</lu-app-layout>`),
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
