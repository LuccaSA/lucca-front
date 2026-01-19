import { Meta, StoryObj } from '@storybook/angular';

interface ContainersBasicStory {
	center: boolean;
	size: string;
	small: false;
}

export default {
	title: 'Documentation/Structure/Container/HTML&CSS/Basic',
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
			options: ['', ' mod-maxM', ' mod-maxL', ' mod-maxXL', ' mod-maxXXL', ' mod-maxXXXL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: ContainersBasicStory): string {
	const center = args.center ? ` mod-center` : '';
	const small = args.small ? ` mod-S` : '';
	return `
	<div class="container${center}${small}${args.size}">
		Ce container est responsive et sert à placer le contenu de votre page.
	</div>
	`;
}

const Template = (args: ContainersBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.container {
			background-color: var(--palettes-neutral-0);
		}
		`,
	],
});

export const Basic: StoryObj<ContainersBasicStory> = {
	args: { center: false, size: '', small: false },
	render: Template,
};
