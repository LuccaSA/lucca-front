import { Meta, StoryObj } from '@storybook/angular';

interface CardsExpandStory {}

export default {
	title: 'Documentation/Structure/Cards/Expand',
	argTypes: {},
} as Meta;

function getTemplate(args: CardsExpandStory): string {
	return `<div class="card mod-expand">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
</div>`;
}

const Template = (args: CardsExpandStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Expand: StoryObj<CardsExpandStory> = {
	args: {},
	render: Template,
};
