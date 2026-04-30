import { Meta, StoryObj } from '@storybook/angular';

interface ImpersonationBasicStory {
	active: boolean;
}

export default {
	title: 'Documentation/Navigation/Impersonation/HTML & CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: ImpersonationBasicStory): string {
	const active = args.active ? ` is-active` : ``;
	return `<div class="impersonation">
	<button type="button" class="impersonation-trigger${active}" aria-expanded="false" aria-controls="popover-content-0">
		<span class="pr-u-mask">Switch profile:</span>
		<div class="avatar mod-softRounded mod-S">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</div>
		Finn the Human
		<span class="pr-u-mask">– Page content updates as soon as this filter is changed</span>
		<span class="impersonation-trigger-icon">
			<span aria-hidden="true" class="lucca-icon icon-chevronBottom"></span>
		</span>
	</button>
	<button class="clear impersonation-clear">
		<span class="pr-u-mask">Back to default profile</span>
	</button>
</div>`;
}

const Template = (args: ImpersonationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ImpersonationBasicStory> = {
	args: {
		active: false,
	},
	render: Template,
};
