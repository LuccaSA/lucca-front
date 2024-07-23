import { Meta, StoryFn } from '@storybook/angular';

interface PLGPushBasicStory {
	pushTitle: string;
	linkLabel: string;
	linkURL: string;
}

export default {
	title: 'Documentation/Feedback/PLG Push/HTML & CSS/Basic',
	argTypes: {
		pushTitle: {
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

function getTemplate(args: PLGPushBasicStory): string {
	const title = args.pushTitle ? `<div class="plgPush-content-title">${args.pushTitle}</div>` : ``;
	const link =
		args.linkURL && args.linkLabel
			? `<div class="plgPush-content-link">
				<a class="link mod-icon u-textProduct" href="${args.linkURL}" target="_blank" rel="noopener noreferrer">
					${args.linkLabel}
					<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-S"></span>
					<span class="u-mask">Ouvrir dans une nouvelle fenêtre</span>
				</a>
			</div>`
			: ``;
	return `
	<div class="plgPush">
		<div class="plgPush-icons">
			<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket"></span>
			<svg class="plgPush-icons-back" aria-hidden="true" viewBox="0 0 32 32">
				<path
					d="M7.78066 27.3433C-7.15809 9.74516 2.8692 3.56387 9.33431 1.57963C15.8092 -0.408899 34.8658 -3.46454 31.634 13.4808C28.4035 30.4261 16.3229 37.4045 7.78066 27.3433Z"
					fill="var(--palettes-brand-100)"
				/>
			</svg>
		</div>
		<div class="plgPush-content">
			${title}
			<div class="plgPush-content-description">Description</div>
			${link}
		</div>
	</div>`;
}

const Template: StoryFn<PLGPushBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	pushTitle: `Title`,
	linkLabel: `Link`,
	linkURL: `https://www.google.com/`,
};
