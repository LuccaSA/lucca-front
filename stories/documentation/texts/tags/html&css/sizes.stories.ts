import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<span class="tag mod-L">Text</span>
<span class="tag mod-M">Text</span>
<!-- 20.3 --><span class="tag mod-S">Text</span>`;
}

const Template = () => ({
	template: getTemplate(),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
			align-items: center;
		}`,
	],
});

export const Sizes: StoryObj = {
	args: {},
	render: Template,
};
