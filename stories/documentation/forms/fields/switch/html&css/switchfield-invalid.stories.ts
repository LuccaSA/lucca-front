import { Meta, StoryFn } from '@storybook/angular';

interface SwitchInvlidStory {}

export default {
	title: 'Documentation/Forms/Fields/SwitchField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: SwitchInvlidStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="switchField">
		<input type="checkbox" class="switchField-input" id="ID" aria-describedby="IDmessage" aria-invalid="true" />
		<span class="switchField-icon" aria-hidden="true"><span class="switchField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">Helper text</div>
</div>`;
}

const Template: StoryFn<SwitchInvlidStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Invlid = Template.bind({});
Invlid.args = {};
