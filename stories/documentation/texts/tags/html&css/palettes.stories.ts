import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Palettes',
} as Meta;

function getTemplate(): string {
	return `<span class="tag palette-product">Text</span>
<span class="tag palette-success">Text</span>
<span class="tag palette-warning">Text</span>
<span class="tag palette-error">Text</span>
<span class="tag palette-kiwi">Text</span>
<span class="tag palette-lime">Text</span>
<span class="tag palette-cucumber">Text</span>
<span class="tag palette-mint">Text</span>
<span class="tag palette-glacier">Text</span>
<span class="tag palette-lagoon">Text</span>
<span class="tag palette-blueberry">Text</span>
<span class="tag palette-lavender">Text</span>
<span class="tag palette-grape">Text</span>
<span class="tag palette-watermelon">Text</span>
<span class="tag palette-pumpkin">Text</span>
<span class="tag palette-pineapple">Text</span>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
		}`,
	],
});

export const Palettes = Template.bind({});
