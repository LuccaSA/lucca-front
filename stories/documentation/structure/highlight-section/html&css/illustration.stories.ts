import { Meta, StoryObj } from '@storybook/angular-vite';

interface IllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Illustration',
	argTypes: {},
} as Meta;

function getTemplate(args: IllustrationStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Baromètre express</p>
			<p class="pr-u-bodyS">8 questions | Identifiez rapidement les grandes tendances et les priorités d’action de votre organisation avec ce modèle.</p>
			<p><a class="link" href="#">Utiliser le modèle</a></p>
		</div>
		<img alt="" class="highlightSection-content-illustration" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/polaroids.svg" />
	</div>
	<div class="highlightSection-bubbles">
		<img alt="" class="highlightSection-bubbles-start" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg" />
	</div>
</div>`;
}

const Template = (args: IllustrationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Illustration: StoryObj<IllustrationStory> = {
	args: {},
	render: Template,
};
