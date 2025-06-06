import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLInAppLayoutStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentOverflowing: boolean;
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
	},
	render: (args: MainLayoutHTMLInAppLayoutStory) => {
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-content-header ${headerStickyParam}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-content-footer ${footerStickyParam}">footer</div>` : ``;
		const content = `<div class="mainLayout-content-block">
	<div class="fakeContent">
		<div class="container">
			content
		</div>
	</div>
</div>`;
		const contentOverflow = `<div class="mainLayout-content-block mod-overflow">
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
.appLayout {
	--components-appLayout-blockSize: 100%;
	--components-appLayout-inlineSize: 100%;
	resize: vertical;
	overflow: hidden;
	min-height: 10rem;
}
.appLayout-banner {
	background-color: var(--palettes-neutral-0);
	border-radius: var(--commons-borderRadius-L);
}
.appLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0);
	border-radius: var(--commons-borderRadius-L);
}
.mainLayout-sidebar {
	background-color: var(--palettes-neutral-200);
	border-radius: var(--commons-borderRadius-L);
}
.mainLayout-content-header,
.mainLayout-content-footer {
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
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">
		navSide
	</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			${sidebarContainer}
			<div class="mainLayout-content">
				${headerContainer}
				${content}
				${lastContent}
				${footerContainer}
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
	},
};
