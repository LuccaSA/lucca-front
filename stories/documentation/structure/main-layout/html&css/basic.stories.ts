import { Meta } from '@storybook/angular';

interface MainLayoutHTMLBasicStory {
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
	title: 'Documentation/Structure/Main Layout/HTML&CSS/Basic',
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
	render: (args: MainLayoutHTMLBasicStory) => {
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
			styles: [
				`
.mainLayout {
		resize: vertical;
		overflow: hidden;
		min-block-size: 296px;
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
}
				`,
			],
			template: `
		<main role="main" class="mainLayout">${sidebarContainer}
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">${headerContainer}${content}${footerContainer}
				</div>
			</div>
		</main>
`,
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
