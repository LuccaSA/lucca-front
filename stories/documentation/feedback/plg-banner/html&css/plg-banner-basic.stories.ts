import { Meta, StoryFn } from '@storybook/angular';

interface PLGBannerBasicStory {
	bannerTitle: string;
	linkLabel: string;
	linkURL: string;
}

export default {
	title: 'Documentation/Feedback/PLG Banner/HTML & CSS/Basic',
	argTypes: {
		bannerTitle: {
			control: {
				type: 'text',
			},
		},
		linkLabel: {
			control: {
				type: 'text',
			},
		},
		linkURL: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: PLGBannerBasicStory): string {
	const title = args.bannerTitle ? `<div class="plgBanner-content-title">${args.bannerTitle}</div>` : ``;
	const link =
		args.linkURL && args.linkLabel
			? `<div class="plgBanner-content-link">
				<a class="link mod-icon u-textProduct" href="${args.linkURL}" target="_blank">
					${args.linkLabel}
					<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
					<span class="u-mask">Ouvrir dans une nouvelle fenêtre</span>
				</a>
			</div>`
			: ``;
	return `
	<div class="plgBanner">
		<div class="plgBanner-icons">
			<span aria-hidden="true" class="plgBanner-icons-front lucca-icon icon-transportRocket"></span>
			<svg class="plgBanner-icons-back" aria-hidden="true" viewBox="0 0 32 32">
				<path
					d="M7.78066 27.3433C-7.15809 9.74516 2.8692 3.56387 9.33431 1.57963C15.8092 -0.408899 34.8658 -3.46454 31.634 13.4808C28.4035 30.4261 16.3229 37.4045 7.78066 27.3433Z"
					fill="#FFE0D1"
				/>
			</svg>
		</div>
		<div class="plgBanner-content">
			${title}
			<div class="plgBanner-content-description">Description</div>
			${link}
		</div>
	</div>`;
}

const Template: StoryFn<PLGBannerBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	bannerTitle: `Title`,
	linkLabel: `Link`,
	linkURL: `https://www.google.com/`,
};
