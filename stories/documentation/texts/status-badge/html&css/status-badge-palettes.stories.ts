import { Meta, StoryFn } from '@storybook/angular';

interface StatusBadgePalettesStory {}

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Palettes',
	argTypes: {},
} as Meta;

function getTemplate(args: StatusBadgePalettesStory): string {
	return `<div class="statusBadge palette-product">Status</div>
<div class="statusBadge palette-success">Status</div>
<div class="statusBadge palette-warning">Status</div>
<div class="statusBadge palette-error">Status</div>`;
}

const Template: StoryFn<StatusBadgePalettesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
		}`,
	],
});

export const Palettes = Template.bind({});
Palettes.args = {};
