import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutHTMLBasicStory {
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/HTML&CSS/Basic',
	argTypes: {},
	render: (args: AppLayoutHTMLBasicStory) => {
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

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
				`,
			],
			template: cleanupTemplate(`
<div class="appLayout ${mobileNavSideBottomAttribute}">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">navSide</div>
	<div class="appLayout-main">
    main
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		mobileNavSideBottom: false,
	},
};
