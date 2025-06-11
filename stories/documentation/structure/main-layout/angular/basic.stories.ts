import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutAngularBasicStory {
	header: boolean;
	footer: boolean;
	headerSticky: boolean;
	footerSticky: boolean;
	sidebar: boolean;
	contentOverflowing: boolean;
	repeatContent: number;
	repeatOverflow: number;
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
		repeatContent: {
			control: { type: 'range', min: 1, max: 10 },
		},
		repeatOverflow: {
			control: { type: 'range', min: 2, max: 10 },
			if: { arg: 'contentOverflowing', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent, MainLayoutBlockComponent],
		}),
	],
	render: (args: MainLayoutAngularBasicStory) => {
		const headerContainer = args.header ? `<ng-container mainLayoutHeader><div class="container">header</div></ng-container>` : ``;
		const footerContainer = args.footer ? `<ng-container mainLayoutFooter><div class="container">footer</div></ng-container>` : ``;
		const headerStickyParam = args.headerSticky ? `headerSticky` : ``;
		const footerStickyParam = args.footerSticky ? `footerSticky` : ``;
		const sidebarContainer = args.sidebar ? `<ng-container mainLayoutSidebar>sidebar</ng-container>` : ``;
		const template = `<lu-main-layout-block>
	<div class="container">
		<div class="fakeContent">
			content
		</div>
	</div>
</lu-main-layout-block>`;
		const contentOverflow = ` content overflowing`;
		let overflow = ``;
		for (let i = 1; i <= args.repeatOverflow; i++) {
			overflow = overflow + contentOverflow;
		}
		const templateOverflow = `<lu-main-layout-block overflow>
			<div class="container">
				<div class="fakeContent">
					${overflow}
				</div>
			</div>
		</lu-main-layout-block>`;
		let content = ``;
		for (let i = 1; i <= args.repeatContent; i++) {
			if (i === args.repeatContent && args.contentOverflowing) {
				content = content + templateOverflow;
			} else {
				content = content + template;
			}
		}

		return {
			styles: [
				`
:host {
  .mainLayout {
		resize: vertical;
		overflow: auto;
		min-block-size: 3lh;
	}
	.mainLayout-sidebar {
		background-color: var(--palettes-neutral-200);
	}
	.mainLayout-content-inside-header,
	.mainLayout-content-inside-footer {
		&.mod-sticky {
			box-shadow: 0 1px 0 0 var(--palettes-neutral-400);
			background-color: rgba(256, 256, 256, 0.75);
		}

		.container {
			display: flex;
			justify-content: space-between;

			&::after {
				content: 'end';
			}
		}
	}
	.mainLayout-content-inside-footer {
		&.mod-sticky {
			box-shadow: 0 -1px 0 0 var(--palettes-neutral-400);
		}
	}
	.container {
		--commons-container-maxWidth: 40rem;
	}
	.fakeContent {
		background-color: var(--palettes-neutral-0);
		white-space: nowrap;
		background-image: linear-gradient(to right, currentColor, transparent);
		background-clip: text;
  	-webkit-text-fill-color: transparent;

		display: flex;
		justify-content: space-between;

		&::after {
			content: ' end';
			-webkit-text-fill-color: currentColor;
		}
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
		repeatOverflow: 5,
		repeatContent: 1,
	},
};
