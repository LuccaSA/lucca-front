import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

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
			control: { type: 'range', min: 2, max: 10 },
			if: { arg: 'contentOverflowing', truthy: true },
		},
	},
	render: (args: MainLayoutHTMLBasicStory) => {
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-content-inside-header ${headerStickyParam}"><div class="container">header</div></div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-content-inside-footer ${footerStickyParam}"><div class="container">footer</div></div>` : ``;
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
.mainLayout {
		resize: vertical;
		overflow: auto;
		min-height: 3lh;
	}
	.mainLayout-sidebar {
		background-color: var(--palettes-neutral-200);
	}
	.mainLayout-content-inside-header,
	.mainLayout-content-inside-footer {
		&.mod-sticky {
			box-shadow: 0 1px 0 0 var(--palettes-neutral-400);
			background-color: rgba(256, 256, 256, 0.75);
		}

		.container {
			display: flex;
			justify-content: space-between;

			&::after {
				content: 'end';
			}
		}
	}
	.mainLayout-content-inside-footer {
		&.mod-sticky {
			box-shadow: 0 -1px 0 0 var(--palettes-neutral-400);
		}
	}
	.container {
		--commons-container-maxWidth: 40rem;
	}
	.fakeContent {
		background-color: var(--palettes-neutral-0);
		overflow: hidden;
		min-height: 1.5rem;
		white-space: nowrap;
		background-image: linear-gradient(to right, currentColor, transparent);
		background-clip: text;
  	-webkit-text-fill-color: transparent;

		display: flex;
		justify-content: space-between;

		&::after {
			content: ' end';
			-webkit-text-fill-color: currentColor;
		}
	}
				`,
			],
			template: cleanupTemplate(`
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
