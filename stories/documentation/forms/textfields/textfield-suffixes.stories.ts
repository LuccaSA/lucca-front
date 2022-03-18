import { Meta, Story } from '@storybook/angular';

interface TextifeldSuffixesStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Suffixes',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldSuffixesStory): string {
	return `
		<label class="textfield mod-withSuffix">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Label textfield</span>
			<span class="textfield-suffix">€</span>
		</label>
		<label class="textfield mod-search">
			<input class="textfield-input" type="text" placeholder="ex : Mon précieux">
			<span class="textfield-label">Rechercher</span>
		</label>
	`
}

const Template: Story<TextifeldSuffixesStory> = (args: TextifeldSuffixesStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`]
});

export const Suffixes = Template.bind({});
Suffixes.args = {};
