import { Meta, StoryFn } from '@storybook/angular';

interface CardsClickableStory {}

export default {
	title: 'Documentation/Structure/Cards/Clickable',
	argTypes: {},
} as Meta;

function getTemplate(args: CardsClickableStory): string {
	return `
	<div class="card mod-clickable">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<div>Contenu de la carte</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<CardsClickableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Clickable = Template.bind({});
Clickable.args = {};
