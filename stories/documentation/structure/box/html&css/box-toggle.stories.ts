import { Meta, StoryObj } from '@storybook/angular-vite';

interface BoxToggleStory {
	neutral: boolean;
}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Toggle',
	argTypes: {
		neutral: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: BoxToggleStory): string {
	const neutral = args.neutral ? `mod-neutral` : '';

	return `<div class="switch">
		<input class="switch-input" type="checkbox" id="boxSwitch" checked disabled>
		<label class="switch-label" for="boxSwitch">Switch</label>
</div>
<div class="box mod-toggle ${neutral}">
		Custom content
</div>`;
}

const Template = (args: BoxToggleStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.neutral === false ? ':host { background-color: var(--palettes-neutral-0); margin: -15px; padding: 15px; }' : '',
	],
});

export const Toggle: StoryObj<BoxToggleStory> = {
	args: { neutral: false },
	render: Template,
};
