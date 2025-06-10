import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentOverflowing: boolean;
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
	},
	render: (args: MainLayoutHTMLBasicStory) => {
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-content-inside-header ${headerStickyParam}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-content-inside-footer ${footerStickyParam}">footer</div>` : ``;
		const content = `<div class="mainLayout-content-inside-block">
	<div class="fakeContent">
		<div class="container">
			content
		</div>
	</div>
</div>`;
		const contentOverflow = `<div class="mainLayout-content-inside-block mod-overflow">
	<div class="fakeContent" style="width: 80rem">
		<div class="container">
			content overflowing
		</div>
	</div>
</div>`;
		const lastContent = args.contentOverflowing ? contentOverflow : content;
		return {
			styles: [
				`
.mainLayout {
	--components-appLayout-blockSize: 100%;
	--components-appLayout-inlineSize: 100%;
	resize: vertical;
	overflow: hidden;
	min-height: 10rem;
}
.mainLayout-sidebar {
	background-color: var(--palettes-neutral-200);
	border-radius: var(--commons-borderRadius-L);
}
.mainLayout-content-inside-header,
.mainLayout-content-inside-footer {
	background-color: var(--palettes-neutral-0);
	border-radius: var(--commons-borderRadius-L);
}
.container {
		--commons-container-maxWidth: 40rem;
		display: flex;
		justify-content: space-between;

		.mod-overflow & {
				--commons-container-maxWidth: none;
		}

		&::after {
			content: 'end'
		}
	}
.fakeContent {
	background-color: var(--palettes-neutral-700);
	color: var(--palettes-neutral-0);
	border-radius: var(--commons-borderRadius-L);
	resize: vertical;
	overflow: hidden;
	min-height: 1.5rem;
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
					${lastContent}
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
	},
};
