import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ButtonStyleStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Style',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
} as Meta;

function getTemplate(args: ButtonStyleStory): string {
	return `<button type="button" class="button">Button</button>
<button type="button" class="button mod-outlined">Button</button>
<button type="button" class="button mod-ghost">Button</button>
<!-- 20.3 --><button type="button" class="button mod-AI">Button</button>`;
}

const Template = (args: ButtonStyleStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			gap: 1rem;
		}
	`,
	],
});

export const StyleButton: StoryObj<ButtonStyleStory> = {
	args: {},
	render: Template,
};
