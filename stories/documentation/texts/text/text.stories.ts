import { Meta, StoryFn } from '@storybook/angular';

interface TextBasicStory {}

export default {
	title: 'Documentation/Texts/Text/Basic',
} as Meta;

function getTemplate(args: TextBasicStory): string {
	return `<h1>Titre 1 : Portez ce vieux whisky au juge blond qui fume</h1>
<h2>Titre 2 : Portez ce vieux whisky au juge blond qui fume</h2>
<h3>Titre 3 : Portez ce vieux whisky au juge blond qui fume</h3>
<h4>Titre 4 : Portez ce vieux whisky au juge blond qui fume</h4>
<h5>Titre 5 : Portez ce vieux whisky au juge blond qui fume</h5>
<h6>Titre 6 : Portez ce vieux whisky au juge blond qui fume</h6>
<p>Body 1 : Portez ce vieux whisky au juge blond qui fume</p>
<p class="u-textS">Body 2 : Portez ce vieux whisky au juge blond qui fume</p>
<p class="u-textXS">Body 3 : Portez ce vieux whisky au juge blond qui fume</p>
<p class="u-fontStyleItalic">Caption 1 : Portez ce vieux whisky au juge blond qui fume</p>
<p class="u-fontStyleItalic u-textS">Caption 2 : Portez ce vieux whisky au juge blond qui fume</p>
<p class="u-fontStyleItalic u-textXS">Caption 3 : Portez ce vieux whisky au juge blond qui fume</p>`;
}

const Template: StoryFn<TextBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
