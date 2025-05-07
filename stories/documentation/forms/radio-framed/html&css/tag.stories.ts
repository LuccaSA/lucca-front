import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface RadioFramedTagStory {}

export default {
	title: 'Documentation/Forms/Radio Framed/HTML&CSS/Tag',
	argTypes: {},
	render: (args: RadioFramedTagStory) => {
		return {
			template: cleanupTemplate(`
<div class="radioFramed">
	<div class="radioFramed-header">
		<div class="form-field radioFramed-header-field">
			<label class="formLabel radioFramed-header-label" id="radioAlabel" for="optionA">
				Option A
				<span class="formLabel-tag tag">Tag</span>
			</label>
			<span class="radioField">
				<input type="radio" class="radioField-input radioFramed-header-input" aria-labelledby="radioAlabel" id="optionA" name="radioGroup" />
				<span aria-hidden="true" class="radioField-icon">
					<span class="radioField-icon-check"></span>
				</span>
			</span>
		</div>
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
