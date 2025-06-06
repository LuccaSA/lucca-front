import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	sidebar: boolean;
	contentOverflowing: boolean;
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
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent],
		}),
	],
	render: (args: MainLayoutAngularBasicStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader>header</ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter>footer</ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const sidebarContainer = args.sidebar ? `<ng-container mainLayoutSidebar>sidebar</ng-container>` : ``;
		const content = `<div class="mainLayout-content-block">
	<div class="fakeContent">
		<div class="container">
			content
		</div>
	</div>
</div>`;
		const contentOverflow = `<div class="mainLayout-content-block mod-overflow">
	<div class="fakeContent" style="inline-size: 80rem">
		<div class="container">
			content overflowing
		</div>
	</div>
</div>`;
		const lastContent = args.contentOverflowing ? contentOverflow : content;
		return {
			styles: [
				`
:host {
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
}
				`,
			],
			template: cleanupTemplate(`

	<lu-main-layout ${headerStickyParam} ${footerStickyParam}>
		${sidebarContainer}
		${headerContainer}
		<ng-container mainLayoutContent>
			${content}
			${lastContent}
		</ng-container>
		${footerContainer}
	</lu-main-layout>`),
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
