import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	contentWithScroll: boolean;
	sidebarWithScroll: boolean;
	navSideWithScroll: boolean;
	sidebar: boolean;
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
		sidebarWithScroll: {
			if: { arg: 'sidebar', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent],
		}),
	],
	render: (args: MainLayoutAngularBasicStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader><div>header</div></ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter><div class="pr-u-marginBlockStartAuto">footer</div></ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock u-alignSelfFlexStart" alt="" />`;
		const contentImg = args.contentWithScroll ? img : ``;
		const sidebarImg = args.sidebarWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const sidebarContainer = args.sidebar ? `<ng-container mainLayoutSidebar>sidebar${sidebarImg}</ng-container>` : ``;
		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		block-size: 25rem;
		border: 1px dashed;
		box-sizing: content-box;
	}
	.appLayout-banner {
		background-color: var(--palettes-neutral-0)
	}
	.appLayout-navSide {
		background-color: var(--palettes-navigation-800);
		color: var(--palettes-neutral-0)
	}
}
				`,
			],
			template: cleanupTemplate(`<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>
		navSide
		${navSideImg}
	</ng-container>
	<lu-main-layout ${headerStickyParam} ${footerStickyParam}>
		${sidebarContainer}
		${headerContainer}
		content
		${contentImg}
		${footerContainer}
	</lu-main-layout>
</lu-app-layout>`),
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
