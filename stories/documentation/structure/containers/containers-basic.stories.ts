import { Meta, StoryFn } from '@storybook/angular';

interface ContainersBasicStory {
	center: boolean;
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
	},
} as Meta;

function getTemplate(args: ContainersBasicStory): string {
	const center = args.center ? `mod-center` : '';
	return `
	<div class="container ${center}">
		<p>Ce container est responsive et sert à placer le contenu de votre page.</p>
	</div>
	`;
}

const Template: StoryFn<ContainersBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { center: true };
