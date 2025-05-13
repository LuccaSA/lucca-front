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
		const headerContent = args.header && !args.headerSticky ? `<div>header</div>` : ``;
		const footerContent = args.footer && !args.footerSticky ? `<div>footer</div>` : ``;
		const headerContainer = args.header && args.headerSticky ? `<div class="mainLayout-header"><div>header</div></div>` : ``;
		const footerContainer = args.footer && args.footerSticky ? `<div class="mainLayout-footer"><div>footer</div></div>` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const imgAside = args.asideWithScroll ? img : ``;
		const imgContent = args.contentWithScroll ? img : ``;
		const imgNavSide = args.navSideWithScroll ? img : ``;
		const asideContainer = args.aside ? `<div class="mainLayout-aside">aside${imgAside}</div>` : ``;
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
			${asideContainer}
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
		aside: false,
		asideWithScroll: false,
		contentWithScroll: false,
		navSideWithScroll: false,
	},
};
