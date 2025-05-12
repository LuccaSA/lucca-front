import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	aside: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentWithScroll: boolean;
	asideWithScroll: boolean;
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
		asideWithScroll: {
			if: { arg: 'aside', truthy: true },
		},
	},
	render: (args: MainLayoutHTMLBasicStory) => {
		const stickyHeader = args.headerSticky ? `mod-sticky` : ``;
		const stickyFooter = args.footerSticky ? `mod-sticky` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const imgAside = args.asideWithScroll ? img : ``;
		const imgContent = args.contentWithScroll ? img : ``;
		const imgNavSide = args.navSideWithScroll ? img : ``;
		const headerContainer = args.header ? `<div class="mainLayout-header ${stickyHeader}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-footer ${stickyFooter}">footer</div>` : ``;
		const asideContainer = args.aside ? `<div class="mainLayout-aside">aside${imgAside}</div>` : ``;
		return {
			styles: [
				`
.bodyLayout {
	--components-bodyLayout-minBlockSize: 25rem;
	block-size: var(--components-bodyLayout-minBlockSize);
	overflow: auto;
	border: 1px dashed;
	box-sizing: content-box;
}
.bodyLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.bodyLayout-navSide {
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
<div class="bodyLayout">
	<div class="bodyLayout-banner">banner</div>
	<div class="bodyLayout-navSide">
		navSide
		${imgNavSide}
	</div>
	<div class="bodyLayout-main">
		<main role="main" class="mainLayout">
			${headerContainer}
			${asideContainer}
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
		aside: false,
		asideWithScroll: false,
		contentWithScroll: false,
		navSideWithScroll: false,
	},
};
