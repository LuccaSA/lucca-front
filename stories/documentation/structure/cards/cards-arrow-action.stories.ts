import { Meta, StoryFn } from '@storybook/angular';

interface CardsArrowActionStory {
	link: boolean;
}

export default {
	title: 'Documentation/Structure/Cards/Arrow Action',
	argTypes: {
		link: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: CardsArrowActionStory): string {
	const linkOrButton = args.link
		? `<a href="#" class="button mod-onlyIcon mod-text" onClick="event.preventDefault()">
			  <span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
			  <span class="u-mask">Accéder</span>
			</a>`
		: `<button type="button" class="button mod-onlyIcon mod-text" onClick="event.preventDefault()">
			  <span aria-hidden="true" class="lucca-icon icon-arrowRight"></span>
			  <span class="u-mask">Accéder</span>
			</button>`;
	return `
	<div class="card mod-action" onClick="console.log('action or navigation')">
		<div class="card-content">
			<h2 class="card-title">Titre de la carte</h2>
			<p>Contenu de la carte</p>
		</div>
		<div class="card-action">
			${linkOrButton}
		</div>
	</div>
	`;
}

const Template: StoryFn<CardsArrowActionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ArrowAction = Template.bind({});
ArrowAction.args = {
	link: false,
};
