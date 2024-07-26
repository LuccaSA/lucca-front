import { Meta, StoryFn } from '@storybook/angular';

interface PLGPushBasicStory {
	pushTitle: string;
	description: string;
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
		description: {
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
			? `<a class="link mod-icon u-textProduct" href="${args.linkURL}" target="_blank" rel="noopener noreferrer">
					${args.linkLabel}
					<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-S"></span>
					<span class="u-mask">Ouvrir dans une nouvelle fenêtre</span>
				</a>`
			: ``;
	return `
	<div class="plgPush">
		<div class="plgPush-icons">
			<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket mod-S"></span>
            <img class="plgPush-icons-back" alt="" src="https://cdn.lucca.fr/lucca-front/assets/plg-push/shape.svg" />
		</div>
		<div class="plgPush-content">
			${title}
			<div class="plgPush-content-description">
				${args.description}
				${link}
			</div>
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
	description: `Description`,
	linkLabel: `Link`,
	linkURL: `https://www.google.com/`,
};
