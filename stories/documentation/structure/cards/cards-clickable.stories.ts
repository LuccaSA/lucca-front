import { Meta, StoryObj } from '@storybook/angular';

interface CardsClickableStory {}

export default {
	title: 'Documentation/Structure/Cards/Clickable',
	argTypes: {},
} as Meta;

function getTemplate(args: CardsClickableStory): string {
	return `<div class="card mod-clickable">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
</div>`;
}

const Template = (args: CardsClickableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Clickable: StoryObj<CardsClickableStory> = {
	args: {},
	render: Template,
};
