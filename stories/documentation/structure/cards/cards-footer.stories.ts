import { Meta, Story } from '@storybook/angular';

interface CardsFooterStory {}

export default {
	title: 'Documentation/Structure/Cards/Footer',
} as Meta;

function getTemplate(args: CardsFooterStory): string {
	return `
	<div class="card">
		<div class="card-content">
			<h2>Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
		<footer class="card-footer">
			<div class="card-footer-right">
				<button class="button palette-primary">Confirmer</button>
				<button class="button mod-link">Annuler</button>
			</div>
		</footer>
	</div>
	`
}

const Template: Story<CardsFooterStory> = (args: CardsFooterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Footer = Template.bind({});
Footer.args = { };
