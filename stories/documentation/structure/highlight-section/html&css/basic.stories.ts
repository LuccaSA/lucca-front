import { Meta, StoryObj } from '@storybook/angular-vite';

interface BasicStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Créez des politiques de frais pour ces unités légales</p>
			<p class="pr-u-bodyS">Allemagne : Lucca Deutschland — Suisse : Lucca Switzerland — Royaume-Uni : Lucca UK</p>
		</div>
	</div>
	<div class="highlightSection-bubbles">
		<img alt="" class="highlightSection-bubbles-start" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg" />
		<img alt="" class="highlightSection-bubbles-end" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/lucca/bubbles-light-1.svg" />
	</div>
</div>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {},
	render: Template,
};
