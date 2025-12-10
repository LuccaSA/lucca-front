import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/StatusBadge/HTML & CSS/Palettes',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="statusBadge palette-product">Status</div>
<div class="statusBadge palette-neutral">Status</div>
<div class="statusBadge palette-success">Status</div>
<div class="statusBadge palette-warning">Status</div>
<div class="statusBadge palette-error">Status</div>`;
}

const Template = () => ({
	template: getTemplate(),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
		}`,
	],
});

export const Palettes: StoryObj = {
	args: {},
	render: Template,
};
