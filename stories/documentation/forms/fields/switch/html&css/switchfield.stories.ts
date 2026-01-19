import { Meta, StoryObj } from '@storybook/angular';

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
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>`;
}

const Template = (args: SwitchBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<SwitchBasicStory> = {
	args: {},
	render: Template,
};
