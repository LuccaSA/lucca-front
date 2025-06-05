import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularInAppLayoutStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	sidebar: boolean;
}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/In AppLayout',
	argTypes: {
		headerSticky: {
			if: { arg: 'header', truthy: true },
		},
		footerSticky: {
			if: { arg: 'footer', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent],
		}),
	],
	render: (args: MainLayoutAngularInAppLayoutStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader>header</ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter>footer</ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const sidebarContainer = args.sidebar ? `<ng-container mainLayoutSidebar>sidebar</ng-container>` : ``;
		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		--components-appLayout-blockSize: 28.125rem;
		--components-appLayout-inlineSize: 50rem;
		--components-appLayout-navSide-inlineSize: 7.5rem;

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

	.fakeContent {
		border-radius: var(--commons-borderRadius-L);
		background-color: var(--palettes-pineapple-700);
		height: 8rem;

		&.mod-resize {
			overflow: hidden;
			resize: vertical;
		}
	}

	.mainLayout-header,
	.mainLayout-footer {
		background-color: var(--palettes-neutral-0);
	}

	.mainLayout-sidebar {
		background-color: var(--palettes-pineapple-500);
	}


}

::ng-deep :root {
	--commons-container-maxWidth: 30rem;
}
				`,
			],
			template: cleanupTemplate(`<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>
		navSide
	</ng-container>
	<lu-main-layout ${headerStickyParam} ${footerStickyParam}>
		${sidebarContainer}
		${headerContainer}
		<ng-container mainLayoutContent>
			<div class="mainLayout-content-container container">
				<div class="fakeContent mod-resize"></div>
			</div>
			<div class="mainLayout-content-container container mod-overflow">
				<div class="fakeContent" style="width: 60rem"></div>
			</div>
		</ng-container>
		${footerContainer}
	</lu-main-layout>
</lu-app-layout>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		header: true,
		headerSticky: false,
		footer: true,
		footerSticky: false,
		sidebar: false,
	},
};
