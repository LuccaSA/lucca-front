import { Meta, StoryObj } from '@storybook/angular';

interface CardsNestedStory {}

export default {
	title: 'Documentation/Structure/Cards/Nested',
	argTypes: {},
} as Meta;

function getTemplate(args: CardsNestedStory): string {
	return `<div class="card mod-action mod-nested">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
</div>`;
}

const Template = (args: CardsNestedStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Nested: StoryObj<CardsNestedStory> = {
	args: {},
	render: Template,
};
