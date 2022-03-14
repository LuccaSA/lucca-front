import { Meta, Story } from '@storybook/angular';

interface EmptyStateBasicStory {
}

export default {
	title: 'SCSS/EmptyState/Basic',
} as Meta;

function getTemplate(args: EmptyStateBasicStory): string {
	return `
	<section class="emptyState">
		<h3 class="emptyState-title">Shhh, c'est calme ici</h3>
		<p class="emptyState-description">Vous pouvez suggérer ici une action à réaliser</p>
		<button class="button palette-primary size-big">Faire une action</button>
	</section>
	`
}

const Template: Story<EmptyStateBasicStory> = (args: EmptyStateBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
