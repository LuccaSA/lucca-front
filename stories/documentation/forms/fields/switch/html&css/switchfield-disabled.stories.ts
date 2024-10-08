import { Meta, StoryFn } from '@storybook/angular';

interface SwitchDisabledStory {}

export default {
	title: 'Documentation/Forms/Fields/SwitchField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: SwitchDisabledStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" disabled />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>`;
}

const Template: StoryFn<SwitchDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Disabled = Template.bind({});
Disabled.args = {};
