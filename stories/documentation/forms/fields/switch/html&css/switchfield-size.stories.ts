import { Meta, StoryFn } from '@storybook/angular';

interface SwitchSizeStory {}

export default {
	title: 'Documentation/Forms/Fields/SwitchField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: SwitchSizeStory): string {
	return `<div class="form-field mod-S">
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

const Template: StoryFn<SwitchSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};
