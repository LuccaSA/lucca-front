import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Data Presentation/HTML&CSS/Basic',
} as Meta;

function getTemplate(): string {
	return `<dl class="presentation">
	<dt class="presentation-term">label</dt>
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
