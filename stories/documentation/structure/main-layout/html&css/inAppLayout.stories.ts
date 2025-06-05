import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface MainLayoutHTMLInAppLayoutStory {
	header: boolean;
	headerSticky: boolean;
	sidebar: boolean;
	footer: boolean;
	footerSticky: boolean;
}

export default {
	title: 'Documentation/Structure/Main Layout/HTML&CSS/In AppLayout',
	argTypes: {
		headerSticky: {
			if: { arg: 'header', truthy: true },
		},
		footerSticky: {
			if: { arg: 'footer', truthy: true },
		},
	},
	render: (args: MainLayoutHTMLInAppLayoutStory) => {
		const sidebarContainer = args.sidebar ? `<div class="mainLayout-sidebar">sidebar</div>` : ``;
		const headerStickyParam = args.headerSticky ? `mod-sticky` : ``;
		const footerStickyParam = args.footerSticky ? `mod-sticky` : ``;
		const headerContainer = args.header ? `<div class="mainLayout-header ${headerStickyParam}">header</div>` : ``;
		const footerContainer = args.footer ? `<div class="mainLayout-footer ${footerStickyParam}">footer</div>` : ``;
		return {
			styles: [
				`
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

::ng-deep :root {
	--commons-container-maxWidth: 30rem;
}
				`,
			],
			template: cleanupTemplate(`
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">
		navSide
	</div>
	<div class="appLayout-main">
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
	},
};
