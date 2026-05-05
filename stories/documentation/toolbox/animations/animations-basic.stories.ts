import { Meta, StoryObj } from '@storybook/angular';

interface AnimationBasicStory {
	animation: string;
}

export default {
	title: 'Documentation/Toolbox/Animations/CSS',
	argTypes: {
		animation: {
			options: [
				'',
				'FadeIn',
				'FadeOut',
				'ScaleIn',
				'ScaleOut',
				'ScaleInTop',
				'ScaleOutTop',
				'ScaleInRight',
				'ScaleOutRight',
				'ScaleInBottom',
				'ScaleOutBottom',
				'ScaleInLeft',
				'ScaleOutLeft',
				'SlideIn',
				'SlideInTop',
				'SlideOut',
				'SlideOutTop',
				'SlideInRight',
				'SlideOutRight',
				'SlideInBottom',
				'SlideOutBottom',
				'SlideInLeft',
				'SlideOutLeft',
				'Shake',
				'Pulse',
				'FadeOut',
				'SlideOut',
				'SlideOutTop',
				'SlideOutRight',
				'SlideOutBottom',
				'SlideOutLeft',
				'ScaleOut',
				'ScaleOutTop',
				'ScaleOutRight',
				'ScaleOutBottom',
				'ScaleOutLeft',
			],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: AnimationBasicStory): string {
	const animation = args.animation ? ` pr-u-animated${args.animation}` : ``;
	return `
	<div class="demo${animation}"></div>
	`;
}

const Template = (args: AnimationBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			inline-size: 5rem;
			block-size: 5rem;
			background-color: var(--palettes-neutral-500);
			border-radius: var(--pr-t-border-radius-structure);
		}

	`,
	],
});

export const Basic: StoryObj<AnimationBasicStory> = {
	render: Template,
};
