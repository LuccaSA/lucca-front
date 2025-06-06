import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLBasicStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
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
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-header ${headerStickyParam}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-footer ${footerStickyParam}">footer</div>` : ``;
		return {
			styles: [
				`
.fakeContent {
	border-radius: var(--commons-borderRadius-L);
	background-color: var(--palettes-pineapple-700);
	height: 8rem;

	&.mod-resize {
		overflow: hidden;
		resize: vertical;
	}
}

.mainLayout {
		border: 1px dashed;
		box-sizing: content-box;
		inline-size: 40rem;

		--components-appLayout-inlineSize: 40rem;
	}

	.mainLayout-sidebar {
		background-color: var(--palettes-pineapple-500);
	}

.mainLayout-header,
.mainLayout-footer {
	background-color: var(--palettes-neutral-0);
}

::ng-deep :root {
	--commons-container-maxWidth: 30rem;
}
				`,
			],
			template: cleanupTemplate(`
		<main role="main" class="mainLayout">
			${sidebarContainer}
			${headerContainer}
			<div class="mainLayout-content">
				<div class="mainLayout-content-container container">
					<div class="fakeContent mod-resize"></div>
				</div>
				<div class="mainLayout-content-container container mod-overflow">
					<div class="fakeContent" style="width: 60rem"></div>
				</div>
			</div>
			${footerContainer}
		</main>
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
	},
};
