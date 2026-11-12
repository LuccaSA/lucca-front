import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/HTML&CSS/Basic',
	argTypes: {
		noValue: {
			description: 'Affiche un tiret lorsqu’aucune valeur n’est renseignée, accompagné d’un texte masqué pour les lecteurs d’écran.',
		},
	},
} as Meta;

function getTemplate(args): string {
	const definition = args.noValue
		? `
		<span aria-hidden="true" data-content-before="–"></span>
		<span class="pr-u-mask">Non renseigné</span>
	`
		: 'Value';

	return `<dl class="presentation">
	<dt class="presentation-term">Label</dt>
	<dd class="presentation-definition">${definition}</dd>
</dl>`;
}

const Template = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj = {
	args: {
		noValue: false,
	},
	render: Template,
};
