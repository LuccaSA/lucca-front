import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxChecklistStory {}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxChecklistStory): string {
	return `<div class="form-field">
    <label class="formLabel" for="ID">Label</label>
    <span class="checkboxField mod-checklist">
        <input type="checkbox" class="checkboxField-input" id="ID" aria-describedby="IDmessage" aria-required="true" />
        <span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
    </span>
    <div class="inlineMessage" id="IDmessage">
        <p class="inlineMessage-content">Helper text</p>
    </div>
</div>`;
}

const Template: StoryFn<CheckboxChecklistStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Checklist = Template.bind({});
Checklist.args = {};
