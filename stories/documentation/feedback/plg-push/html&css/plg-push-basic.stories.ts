import { Meta, StoryObj } from '@storybook/angular';

interface PLGPushBasicStory {}

export default {
	title: 'Documentation/Feedback/PLG Push/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: PLGPushBasicStory): string {
	return `<div class="plgPush">
	<div class="plgPush-icons">
		<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket mod-S"></span>
		<img class="plgPush-icons-back" alt="" src="https://cdn.lucca.fr/lucca-front/assets/plg-push/shape.svg" />
	</div>
	<div class="plgPush-content">
		<div class="plgPush-content-description">
			Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
			<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
				<span class="link-text">Demander un essai gratuit</span><!-- no text node here --><span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>
				<span class="pr-u-mask">Ouvrir dans une nouvelle fenêtre</span>
			</a>
		</div>
	</div>
</div>`;
}

const Template = (args: PLGPushBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<PLGPushBasicStory> = {
	args: {},
	render: Template,
};
