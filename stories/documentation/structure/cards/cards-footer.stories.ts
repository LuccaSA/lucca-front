import { Meta, StoryObj } from '@storybook/angular';

interface CardsFooterStory {}

export default {
	title: 'Documentation/Structure/Cards/Footer',
} as Meta;

function getTemplate(args: CardsFooterStory): string {
	return `<div class="card">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
	<footer class="card-footer">
		<div class="card-footer-right">
			<button type="button" class="button palette-product">Confirmer</button>
			<button type="button" class="button mod-ghost">Annuler</button>
		</div>
	</footer>
</div>`;
}

const Template = (args: CardsFooterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Footer: StoryObj<CardsFooterStory> = {
	args: {},
	render: Template,
};
