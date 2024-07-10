import { Meta, StoryFn } from '@storybook/angular';

interface UserTileStory {
	size: string;
	footnote: string;
	firstname: string;
	name: string;
	function: string;
	vertical: boolean;
	nameOnly: boolean;
	placeholder: boolean;
	picture: boolean;
	wordBreak: boolean;
}

export default {
	title: 'Documentation/Users/Tile/HTML&CSS',
	argTypes: {
		size: {
			options: ['mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-XXL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: UserTileStory): string {
	const footnote = args.footnote ? '<div class="userTile-content-footnote">' + args.footnote + '</div>' : '';
	const vertical = args.vertical ? 'mod-vertical' : '';
	const nameOnly = args.nameOnly ? 'mod-nameOnly' : '';
	const placeholder = args.placeholder ? 'mod-placeholder' : '';
	const wordBreak = args.wordBreak ? 'mod-wordBreak' : '';
	const picture = args.picture
		? '<img class="avatar-content" alt="" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" loading="lazy">'
		: '<div aria-hidden="true" class="avatar-content" style="background-color: rgb(202, 92, 214);"><span class="avatar-content-initials">' +
			args.firstname.charAt(0) +
			args.name.charAt(0) +
			'</span></div>';
	return `
	<div class="userTile ${vertical} ${nameOnly} ${wordBreak} ${args.size}">
		<div class="avatar ${placeholder}">
			${picture}
		</div>
		<div class="userTile-content">
			<div class="userTile-content-label">${args.function}</div>
			<div class="userTile-content-title">${args.firstname} ${args.name}</div>
			${footnote}
		</div>
	</div>
	`;
}

const Template: StoryFn<UserTileStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	size: '',
	vertical: false,
	nameOnly: false,
	placeholder: false,
	picture: true,
	wordBreak: false,
	function: 'Function',
	firstname: 'Firstname',
	name: 'Name',
	footnote: '',
};
