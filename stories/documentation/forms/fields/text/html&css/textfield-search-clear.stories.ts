import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldSearchClearStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldSearchClearStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" value="Value" />
			<div class="textField-input-affix">
				<button class="textField-input-affix-clear clear">
					<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
					<span class="u-mask">Vider ce champ</span>
				</button>
				<span aria-hidden="true" class="textField-input-affix-icon lucca-icon icon-searchMagnifyingGlass"></span>
			</div>
		</div>
	</div>
</div>`;
}

const Template: StoryFn<TextfieldSearchClearStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const SearchClear = Template.bind({});
SearchClear.args = {};
