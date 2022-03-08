import { Meta, Story } from '@storybook/angular';

interface TextBasicStory {
}

export default {
	title: 'SCSS/Text/Basic',
} as Meta;

function getTemplate(args: TextBasicStory): string {
	return `
		<h1 class="mod-headline">Headline</h1>
		<h1>Titre h1</h1>
		<h2>Titre h2</h2>
		<h3>Titre h3</h3>
		<h4>Titre h4</h4>
	`
}

const Template: Story<TextBasicStory> = (args: TextBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
