import { Meta, StoryObj } from '@storybook/angular';

interface CardsArrowActionStory {}

export default {
	title: 'Documentation/Structure/Cards/Arrow Action',
} as Meta;

function getTemplate(args: CardsArrowActionStory): string {
	return `<div class="card mod-action">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
	<div class="card-action">
		<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
			<span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
			<span class="pr-u-mask">Accéder</span>
		</button>
	</div>
</div>`;
}

const Template = (args: CardsArrowActionStory) => ({
	props: args,
	template: getTemplate(args),
});

export const ArrowAction: StoryObj<CardsArrowActionStory> = {
	args: {},
	render: Template,
};
