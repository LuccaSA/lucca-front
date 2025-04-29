import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	aside: boolean;
	footer: boolean;
	footerSticky: boolean;
	contentWithScroll: boolean;
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
		const headerContent = args.header && !args.headerSticky ? `<div>header</div>` : ``;
		const footerContent = args.footer && !args.footerSticky ? `<div>footer</div>` : ``;
		const asideContainer = args.aside ? `<div class="mainLayout-aside">aside</div>` : ``;
		const asideParam = args.aside ? `mod-withAside` : ``;
		const headerContainer = args.header && args.headerSticky ? `<div class="mainLayout-header"><div>header</div></div>` : ``;
		const footerContainer = args.footer && args.footerSticky ? `<div class="mainLayout-footer"><div>footer</div></div>` : ``;
		const img = args.contentWithScroll ? `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />` : ``;
		return {
			styles: [
				`
.pageLayout {
	block-size: 25rem;
}
.pageLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.pageLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
}
				`,
			],
			template: cleanupTemplate(`
<div class="pageLayout">
	<div class="pageLayout-banner">banner</div>
	<div class="pageLayout-navSide">navSide</div>
	<div class="pageLayout-main">
		<main role="main" class="mainLayout ${asideParam}">
			${headerContainer}
			${asideContainer}
			<div class="mainLayout-content">
				${headerContent}
				content
				${img}
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
		contentWithScroll: false,
		header: false,
		headerSticky: false,
		footer: false,
		footerSticky: false,
		aside: false,
	},
};
