import { Meta, StoryObj } from '@storybook/angular';

interface ErrorBasicStory {}

export default {
	title: 'Documentation/Feedback/Error/Basic',
} as Meta;

function getTemplate(args: ErrorBasicStory): string {
	return `
	<div class="errorPage">
		<section class="errorPage-section">
			<div class="errorPage-section-info">
				<h1 class="errorPage-section-info-title">Titre de l’erreur</h1>
				<p class="errorPage-section-info-text">Vous n’êtes pas autorisé à consulter cette page ou cette ressource.</p>
				<p><a href="#" class="errorPage-section-info-link">Revenir à la page précédente</a></p>
			</div>
			<img src="https://cdn.lucca.fr/errors/svg/403-lucca.svg" alt="Erreur 403" class="errorPage-section-image">
		</section>
	</div>
	`;
}

const Template = (args: ErrorBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.errorPage {
			block-size: 30rem;
		}`,
	],
});

export const Basic: StoryObj<ErrorBasicStory> = {
	args: {},
	render: Template,
};
