import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/HTML&CSS/List',
} as Meta;

function getTemplate(): string {
	return `<dl class="presentationWrapper">
	<div class="presentation">
		<dt class="presentation-term">Label A</dt>
		<dd class="presentation-definition">Value A</dd>
	</div>
	<div class="presentation">
		<dt class="presentation-term">Label B</dt>
		<dd class="presentation-definition">Value B</dd>
	</div>
</dl>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const List: StoryObj = {
	args: {},
	render: Template,
};
