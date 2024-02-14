import { Meta, StoryFn } from '@storybook/angular';

interface CardsFooterStory {}

export default {
	title: 'Documentation/Structure/Cards/Footer',
} as Meta;

function getTemplate(args: CardsFooterStory): string {
	return `
	<div class="card">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
		<footer class="card-footer">
			<div class="card-footer-right">
				<button type="button" class="button palette-primary">Confirmer</button>
				<button type="button" class="button mod-text">Annuler</button>
			</div>
		</footer>
	</div>
	`;
}

const Template: StoryFn<CardsFooterStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Footer = Template.bind({});
Footer.args = {};
