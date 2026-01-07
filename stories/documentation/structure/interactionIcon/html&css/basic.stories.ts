import { Meta, StoryObj } from '@storybook/angular';

interface InteractionIconBasicStory {
	neutral: boolean;
}

export default {
	title: 'Documentation/Structure/Interaction icon/HTML&CSS/Basic',
	argTypes: {
		neutral: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: InteractionIconBasicStory): string {
	return `<div class="interactionIcon">
	<svg class="interactionIcon-bubble" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
		<path fill="var(--palettes-100, var(--palettes-product-100))" d="M2.25264 16.3895C8.11117 6.4042 21.9332-9.59108 32.4637 7.57789c5.8129 9.48391 15.5505 29.55471-4.5465 32.07901C6.70786 42.3228-5.2602 28.9757 2.25264 16.3895" />
	</svg>
	<span class="interactionIcon-icon">
		<span aria-hidden="true" class="lucca-icon icon-trash"></span>
	</span>
</div>`;
}

const Template = (args: InteractionIconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<InteractionIconBasicStory> = {
	args: {},
	render: Template,
};
