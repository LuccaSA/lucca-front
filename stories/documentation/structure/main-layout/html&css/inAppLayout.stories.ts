import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLInAppLayoutStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentOverflowing: boolean;
	repeatContent: number;
	repeatOverflow: number;
}

export default {
	title: 'Documentation/Structure/Main Layout/HTML&CSS/In AppLayout',
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
	render: (args: MainLayoutHTMLInAppLayoutStory) => {
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-content-inside-header ${headerStickyParam}"><div class="container"><div class="fakeContent">header</div></div></div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-content-inside-footer ${footerStickyParam}"><div class="container"><div class="fakeContent">footer</div></div></div>` : ``;
		const template = `<div class="mainLayout-content-inside-block">
	<div class="container">
		<div class="fakeContent">
			content
		</div>
	</div>
</div>`;
		const contentOverflow = ` content overflowing`;
		let overflow = ``;
		for (let i = 1; i <= args.repeatOverflow; i++) {
			overflow = overflow + contentOverflow;
		}
		const templateOverflow = `<div class="mainLayout-content-inside-block mod-overflow">
			<div class="container">
				<div class="fakeContent">
					${overflow}
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
			styles: [
				`
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

		&::before {
			content: '';
			position: absolute;
			inset-inline-start: var(--pr-t-spacings-100);
			width: 122px;
			height: 32px;
			background-color: var(--palettes-neutral-50);
			border-radius: var(--pr-t-border-radius-50);
		}

		&::after {
			content: '';
			position: absolute;
			inset-inline-end: var(--pr-t-spacings-100);
			width: 32px;
			height: 32px;
			background-color: var(--palettes-neutral-200);
			border-radius: var(--pr-t-border-radius-full);
		}
	}

	.appLayout-navSide {
		background-color: var(--palettes-neutral-500);
	}

	.mainLayout-sidebar {
		background-color: var(--palettes-neutral-50);
		padding: var(--pr-t-spacings-150);
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		color: var(--palettes-brand-700);
		font-family: monospace;
	}

	.mainLayout-content-inside {
		gap: var(--pr-t-spacings-300);
		padding-block: var(--pr-t-spacings-300);
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
				`,
			],
			template: cleanupTemplate(`
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">
		navSide
	</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			${sidebarContainer}
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					${headerContainer}
					${content}
					${footerContainer}
				</div>
			</div>
		</main>
	</div>
</div>
`),
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
