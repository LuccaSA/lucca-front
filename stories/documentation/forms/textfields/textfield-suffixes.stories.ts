import { Meta, Story } from '@storybook/angular';

interface TextfieldSearchAndSuffixStory {}

export default {
	title: 'Documentation/Forms/Textfield/Search And Suffix',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldSearchAndSuffixStory): string {
	return `
		<label class="textfield mod-search">
			<input class="textfield-input" type="text" placeholder="ex : Mon précieux">
			<span class="textfield-label">Rechercher</span>
		</label>
		<label class="textfield mod-withSuffix">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Label textfield</span>
			<span class="textfield-suffix">€</span>
		</label>
	`
}

const Template: Story<TextfieldSearchAndSuffixStory> = (args: TextfieldSearchAndSuffixStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`]
});

export const SearchAndSuffix = Template.bind({});
SearchAndSuffix.args = {};
