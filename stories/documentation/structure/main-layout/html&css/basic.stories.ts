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
		const headerContent = args.header && !args.headerSticky ? `<div>header</div>` : ``;
		const footerContent = args.footer && !args.footerSticky ? `<div>footer</div>` : ``;
		const headerContainer = args.header && args.headerSticky ? `<div class="mainLayout-header"><div>header</div></div>` : ``;
		const footerContainer = args.footer && args.footerSticky ? `<div class="mainLayout-footer"><div>footer</div></div>` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const imgSidebar = args.sidebarWithScroll ? img : ``;
		const imgContent = args.contentWithScroll ? img : ``;
		const imgNavSide = args.navSideWithScroll ? img : ``;
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar${imgSidebar}</div>` : ``;
		return {
			styles: [
				`
.appLayout {
	block-size: 25rem;
}
.appLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.appLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
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
				${headerContent}
				content
				${imgContent}
				${footerContent}
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
