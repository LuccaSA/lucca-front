import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentWithScroll: boolean;
	sidebarWithScroll: boolean;
	navSideWithScroll: boolean;
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
		sidebarWithScroll: {
			if: { arg: 'sidebar', truthy: true },
		},
	},
	render: (args: MainLayoutHTMLBasicStory) => {
		const stickyHeader = args.headerSticky ? `mod-sticky` : ``;
		const stickyFooter = args.footerSticky ? `mod-sticky` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const imgSidebar = args.sidebarWithScroll ? img : ``;
		const imgContent = args.contentWithScroll ? img : ``;
		const imgNavSide = args.navSideWithScroll ? img : ``;
		const headerContainer = args.header ? `<div class="mainLayout-header ${stickyHeader}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-footer ${stickyFooter}">footer</div>` : ``;
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar${imgSidebar}</div>` : ``;
		return {
			styles: [
				`
.appLayout {
	--components-appLayout-minBlockSize: 25rem;
	--components-appLayout-banner-inlineSize: 100%;
	block-size: var(--components-appLayout-minBlockSize);
	overflow: auto;
	outline: 1px dashed;
	box-sizing: content-box;
}
.appLayout-banner {
	background-color: var(--palettes-neutral-0);
}
.appLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
}
.mainLayout-header,
.mainLayout-footer {
	background-color: var(--pr-t-elevation-surface-default);
}
				`,
			],
			template: cleanupTemplate(`
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">
		navSide
		${imgNavSide}
	</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			${headerContainer}
			${sidebarContainer}
			<div class="mainLayout-content">
				content
				${imgContent}
			</div>
			${footerContainer}
		</main>
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		header: false,
		headerSticky: false,
		footer: false,
		footerSticky: false,
		sidebar: false,
		sidebarWithScroll: false,
		contentWithScroll: false,
		navSideWithScroll: false,
	},
};
