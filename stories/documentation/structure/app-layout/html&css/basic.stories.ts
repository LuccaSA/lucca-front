import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutHTMLBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/HTML&CSS/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	render: (args: AppLayoutHTMLBasicStory) => {
		const bannerContainer = args.banner ? `<div class="appLayout-banner">banner</div>` : ``;
		const navSideContainer = args.navSide ? `<div class="appLayout-navSide">navSide</div>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

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
<div class="appLayout ${mobileNavSideBottomAttribute}">
	${bannerContainer}
	${navSideContainer}
	<div class="appLayout-main">
    main
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = { args: { banner: true, navSide: true, mobileNavSideBottom: false } };
