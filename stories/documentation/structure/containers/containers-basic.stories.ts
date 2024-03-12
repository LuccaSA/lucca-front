import { Meta, StoryFn } from '@storybook/angular';

interface ContainersBasicStory {
	center: boolean;
	size: string;
	small: false;
}

export default {
	title: 'Documentation/Structure/Containers/Basic',
	argTypes: {
		center: {
			control: {
				type: 'boolean',
			},
			description: 'Centre le contenu sur les écrans larges.',
		},
		small: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: ['', 'mod-maxM', 'mod-maxL', 'mod-maxXL', 'mod-maxXXL', 'mod-maxXXXL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: ContainersBasicStory): string {
	const center = args.center ? `mod-center` : '';
	const small = args.small ? `mod-S` : '';
	return `
	<div class="container ${center} ${small} ${args.size}">
		Ce container est responsive et sert à placer le contenu de votre page.
	</div>
	`;
}

const Template: StoryFn<ContainersBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.container {
			background-color: var(--colors-white-color);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = { center: true, size: '', small: false };
