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
:host ::ng-deep {
	.appLayout {
		--components-appLayout-blockSize: 27rem;
		--components-appLayout-inlineSize: 48rem;
		resize: both;
		overflow: hidden;
	}
	.appLayout-banner {
		background-color: var(--palettes-neutral-0);
		border-radius: var(--commons-borderRadius-L);
	}
	.appLayout-navSide {
		background-color: var(--palettes-navigation-800);
		color: var(--palettes-neutral-0);
		border-radius: var(--commons-borderRadius-L);
	}
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
