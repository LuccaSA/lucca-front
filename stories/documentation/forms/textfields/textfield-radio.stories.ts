import { Meta, Story } from '@storybook/angular';

interface TextifeldRadioStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Radio',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldRadioStory): string {
	return `
		<label class="radio">
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
		</span>
	`
}

const Template: Story<TextifeldRadioStory> = (args: TextifeldRadioStory) => ({
	props: args,
	template: getTemplate(args)
});

export const Radio = Template.bind({});
Radio.args = {};
