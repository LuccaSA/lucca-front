import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { PageLayoutComponent } from '@lucca-front/ng/page-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	contentWithScroll: boolean;
	asideWithScroll: boolean;
	navSideWithScroll: boolean;
	aside: boolean;
}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/Basic',
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
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, PageLayoutComponent],
		}),
	],
	render: (args: MainLayoutAngularBasicStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader><div>header</div></ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter><div>footer</div></ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const contentImg = args.contentWithScroll ? img : ``;
		const asideImg = args.asideWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const asideContainer = args.aside ? `<ng-container mainLayoutAside>aside${asideImg}</ng-container>` : ``;
		return {
			styles: [
				`
:host ::ng-deep {
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
}
				`,
			],
			template: cleanupTemplate(`<lu-page-layout>
	<ng-container pageLayoutBanner>banner</ng-container>
	<ng-container pageLayoutNavSide>
		navSide
		${navSideImg}
	</ng-container>
	<lu-main-layout ${headerStickyParam} ${footerStickyParam}>
		${asideContainer}
		${headerContainer}
		content
		${contentImg}
		${footerContainer}
	</lu-main-layout>
</lu-page-layout>`),
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
