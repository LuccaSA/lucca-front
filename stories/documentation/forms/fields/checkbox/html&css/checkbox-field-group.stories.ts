import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface CheckboxGroupStory {}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxGroupStory): string {
	return `
<fieldset class="form-fieldset">
	<legend class="formLabel">
		Label<sup aria-hidden="true" class="formLabel-required">*</sup>
		<span class="formLabel-info" luTooltip="Additional info" luTooltipOnlyForDisplay>
			<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
			<span class="pr-u-mask">Additional info</span>
		</span>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="ID">Label</label>
		<span class="checkboxField">
			<input type="checkbox" class="checkboxField-input" id="ID" aria-required="true" />
			<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
		</span>
	</div>
	<div class="form-field">
		<label class="formLabel" for="ID2">Label</label>
		<span class="checkboxField">
			<input type="checkbox" class="checkboxField-input" id="ID2" aria-required="true" />
			<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
		</span>
	</div>
	<div class="form-field">
		<label class="formLabel" for="ID3">Label</label>
		<span class="checkboxField">
			<input type="checkbox" class="checkboxField-input" id="ID3" aria-required="true" />
			<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
		</span>
	</div>
</fieldset>
`;
}

const Template = (args: CheckboxGroupStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Group: StoryObj<CheckboxGroupStory> = {
	args: {},
	render: Template,
};
