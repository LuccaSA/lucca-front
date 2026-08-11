import { Meta, StoryObj } from '@storybook/angular-vite';

interface IllustrationStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Illustration',
	argTypes: {},
} as Meta;

function getTemplate(args: IllustrationStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" width="120" height="120">
			<path fill="var(--palettes-assets-primary, var(--palettes-assets-primary-light, #ffe0d1))" d="M66.357 83.91c8.34 51.878-36.03 65.172-54.632 58.493-18.634-6.679-56.032-47.955-21.827-70.847 34.206-22.891 71.67-17.25 76.459 12.354"/>
			<path fill="var(--palettes-assets-secondary, var(--palettes-assets-secondary-light, #c5eebe)" d="M32.621 24.645c-12.543-5.609-7.276-11.948-3.194-15.1 4.116-3.154 16.56-10.754 16.725.066.164 10.786-6.354 18.22-13.531 15.034"/>
			<path fill="var(--palettes-assets-brand, var(--palettes-assets-brand-dark, #fae999)" d="M112.885 112.652c-14.995 18.416-23.6 7.152-27.209-.886S74.39 80.06 92.958 84.206c18.57 4.113 28.5 17.941 19.927 28.446"/>
		</svg>
	</div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Baromètre express</p>
			<p class="pr-u-bodyS">
				8 questions –
				Identifiez rapidement les grandes tendances et les priorités d’action de votre organisation avec ce modèle.
				</p>
			<p><a class="link" href="#">Utiliser le modèle</a></p>
		</div>
		<img alt="" class="highlightSection-content-illustration" src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/pola.svg" />
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
