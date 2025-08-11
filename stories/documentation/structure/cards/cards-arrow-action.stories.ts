import { Meta, StoryFn } from '@storybook/angular';

interface CardsArrowActionStory {}

export default {
	title: 'Documentation/Structure/Cards/Arrow Action',
} as Meta;

function getTemplate(args: CardsArrowActionStory): string {
	return `<div class="card mod-action">
	<div class="card-content">
		<h2 class="card-title">Titre de la carte</h2>
		<p>Contenu de la carte</p>
	</div>
	<div class="card-action">
		<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier">
			<span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
			<span class="u-mask">Accéder</span>
		</button>
	</div>
</div>`;
}

const Template: StoryFn<CardsArrowActionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ArrowAction = Template.bind({});
ArrowAction.args = {};
