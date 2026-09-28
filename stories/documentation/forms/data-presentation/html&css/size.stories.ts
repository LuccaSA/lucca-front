import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/HTML&CSS/Size',
} as Meta;

function getTemplate(): string {
	return `<dl class="presentation mod-S">
	<dt class="presentation-term">Label</dt>
	<dd class="presentation-definition">Value</dd>
</dl>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
