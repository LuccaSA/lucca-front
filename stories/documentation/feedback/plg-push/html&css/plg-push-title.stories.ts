import { Meta, StoryFn } from '@storybook/angular';

interface PLGPushTitleStory {
}

export default {
	title: 'Documentation/Feedback/PLG Push/HTML & CSS/Title',
	argTypes: {},
} as Meta;

function getTemplate(args: PLGPushTitleStory): string {
	return `<div class="plgPush">
	<div class="plgPush-icons">
		<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket mod-S"></span>
		<img class="plgPush-icons-back" alt="" src="https://cdn.lucca.fr/lucca-front/assets/plg-push/shape.svg" />
	</div>
	<div class="plgPush-content">
		<div class="plgPush-content-title">Connaissez-vous Timmi Office ?</div>
		<div class="plgPush-content-description">
			Activez toutes les options liées aux télétravail.
			<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
				<span>Demander un essai gratuit</span>
				<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
				<span class="u-mask">Ouvrir dans une nouvelle fenêtre</span>
			</a>
		</div>
	</div>
</div>`;
}

const Template: StoryFn<PLGPushTitleStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Title = Template.bind({});
Title.args = {};
