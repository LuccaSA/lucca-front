import { Meta, StoryFn } from '@storybook/angular';

interface TagsPalettesStory {
}

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Palettes',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TagsPalettesStory): string {
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

const Template: StoryFn<TagsPalettesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-XXXS);
		}`,
	],
});

export const Palettes = Template.bind({});
Palettes.args = { };
