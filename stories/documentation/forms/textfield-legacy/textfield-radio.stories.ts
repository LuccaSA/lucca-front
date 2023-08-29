import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldRadioStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Radio',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldRadioStory): string {
	return `<label class="radio">
	<input class="radio-input" type="radio" name="radioListID">
	<span class="radio-label">Option</span>
</label>
<span class="radio">
	<label>
		<input class="radio-input" type="radio" name="radioListID" checked>
		<span class="radio-label">Or</span>
	</label>
	<label class="textfield mod-radio">
		<span class="textfield-label u-mask">Option</span>
		<input class="textfield-input" type="text">
	</label>
</span>`;
}

const Template: StoryFn<TextfieldRadioStory> = (args: TextfieldRadioStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Radio = Template.bind({});
Radio.args = {};
