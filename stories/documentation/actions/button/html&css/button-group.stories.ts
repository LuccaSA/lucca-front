import { Meta, StoryFn } from '@storybook/angular';

interface ButtonGroupStory {
	outlined: boolean;
	size: string;
	noFlexWrap: boolean;
}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Group',
	argTypes: {
		outlined: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		noFlexWrap: {
			description: 'Désactive la réorganisation des butons en cas de manque de place.',
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ButtonGroupStory): string {
	const classes = [args.size].filter(Boolean).join(' ');
	const noFlexWrap = args.noFlexWrap ? `u-flexWrapNowrap` : '';
	const outlined = args.outlined ? `mod-outlined` : '';

	return `<ul class="button-group ${outlined} ${noFlexWrap}">
	<li class="button-group-item"><button type="button" class="button ${outlined} ${classes}">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button ${outlined} ${classes}">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button ${outlined} ${classes}">Bouton</button></li>
	<li class="button-group-item">
		<button type="button" class="button ${outlined} ${classes} mod-more">
			<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
			<span class="u-mask">Plus d'actions</span>
		</button>
	</li>
</ul>`;
}

const Template: StoryFn<ButtonGroupStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const GroupButton = Template.bind({});
GroupButton.args = { noFlexWrap: false, outlined: false, size: '' };
