import { Meta, Story } from '@storybook/angular';

interface ButtonGroupStory {
	noFlexWrap: boolean;
}

export default {
	title: 'Documentation/Actions/Button/Group',
	argTypes: {
		noFlexWrap: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ButtonGroupStory): string {
	const noFlexWrap = args.noFlexWrap ? `u-flexWrapNowrap` : '';

	return `
	<ul class="button-group ${noFlexWrap}">
		<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
		<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
		<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
		<li class="button-group-item">
			<button type="button" class="button mod-more">
				<span class="lucca-icon icon-chevronSouth" aria-hidden="true"></span>
				<span class="u-mask">Plus d'actions</span>
			</button>
		</li>
	</ul>
	`;
}

const Template: Story<ButtonGroupStory> = (args: ButtonGroupStory) => ({
	props: args,
	template: getTemplate(args)
});

export const Group = Template.bind({});
Group.args = { noFlexWrap: false };
