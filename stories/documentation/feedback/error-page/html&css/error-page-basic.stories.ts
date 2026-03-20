import { Meta, StoryObj } from '@storybook/angular';

interface ErrorBasicStory {}

export default {
	title: 'Documentation/Feedback/ErrorPage/HTML & CSS/Basic',
} as Meta;

function getTemplate(args: ErrorBasicStory): string {
	return `<div class="errorPage">
	<section class="errorPage-section">
		<div class="errorPage-section-info">
			<h1 class="errorPage-section-info-title">Erreur 403</h1>
			<p class="errorPage-section-info-text">Vous n’êtes pas autorisé à consulter cette page ou cette ressource.</p>
			<p><a href="#">Revenir à la page précédente</a></p>
		</div>
		<img src="https://cdn.lucca.fr/errors/svg/403-lucca.svg" alt="" class="errorPage-section-image" />
	</section>
</div>`;
}

const Template = (args: ErrorBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.errorPage,
		.errorPage-section {
			block-size: 100%;
			inline-size: 100%;
		}`,
	],
});

export const Basic: StoryObj<ErrorBasicStory> = {
	args: {},
	render: Template,
};
