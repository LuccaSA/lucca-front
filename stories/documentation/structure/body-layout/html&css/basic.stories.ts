import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutHTMLBasicStory {
	navSide: string;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/Body Layout/HTML&CSS/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	render: (args: BodyLayoutHTMLBasicStory) => {
		const navSideContainer = args.navSide ? `<div class="bodyLayout-navSide">navSide</div>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

		return {
			template: cleanupTemplate(`<div class="bodyLayout ${mobileNavSideBottomAttribute}">
	<div class="bodyLayout-banner">banner</div>
	${navSideContainer}
	<div class="bodyLayout-main">
    main
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = { args: { navSide: true, mobileNavSideBottom: false } };
