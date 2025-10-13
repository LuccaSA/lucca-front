import { Meta } from '@storybook/angular';

interface AppLayoutHTMLBasicStory {
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/HTML&CSS/Basic',
	argTypes: {},
	render: (args: AppLayoutHTMLBasicStory) => {
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? ` mod-mobileNavSideBottom` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		--components-appLayout-blockSize: 100%;
		--components-appLayout-inlineSize: 100%;
		resize: vertical;
		overflow: hidden;
		min-block-size: 394px;
		border-radius: var(--pr-t-border-radius-100);
		border: 1px solid var(--palettes-neutral-200);

		> * {
			font-family: monospace;
			padding-block: var(--pr-t-spacings-300);
			display: grid;
			place-items: center;

			&.appLayout-banner {
				padding-block: 0;
			}

			&.appLayout-navSide {
				padding-inline: var(--pr-t-spacings-400);
			}
		}
	}

	.appLayout-banner {
		background-color: var(--pr-t-elevation-surface-raised);
		box-shadow: var(--pr-t-elevation-shadow-overflow);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			inset-inline-start: var(--pr-t-spacings-100);
			width: 122px;
			height: 32px;
			background-color: var(--palettes-neutral-50);
			border-radius: var(--pr-t-border-radius-50);
		}

		&::after {
			content: '';
			position: absolute;
			inset-inline-end: var(--pr-t-spacings-100);
			width: 32px;
			height: 32px;
			background-color: var(--palettes-neutral-200);
			border-radius: var(--pr-t-border-radius-full);
		}
	}
	.appLayout-navSide {
		background-color: var(--palettes-neutral-500);
	}
}
				`,
			],
			template: `
<div class="appLayout${mobileNavSideBottomAttribute}">
	<div class="appLayout-banner">
		banner
	</div>
	<div class="appLayout-navSide">
		navSide
	</div>
	<div class="appLayout-main">
		main
	</div>
</div>
`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		mobileNavSideBottom: false,
	},
};
