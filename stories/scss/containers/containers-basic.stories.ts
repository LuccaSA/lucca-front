import { Meta, Story } from '@storybook/angular';

interface ContainersBasicStory {
}

export default {
	title: 'SCSS/Containers/Basic',
} as Meta;

function getTemplate(args: ContainersBasicStory): string {
	return `
	<div class="container mod-center">
		<p>Ce container est automatiquement centré et est responsive</p>
	</div>
	`
}

const Template: Story<ContainersBasicStory> = (args: ContainersBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { };
