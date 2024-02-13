import { Meta, StoryFn } from '@storybook/angular';

interface SwitchBasicStory {}

export default {
	title: 'Documentation/Forms/Fields/SwitchField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: SwitchBasicStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">Helper text</div>
</div>`;
}

const Template: StoryFn<SwitchBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
