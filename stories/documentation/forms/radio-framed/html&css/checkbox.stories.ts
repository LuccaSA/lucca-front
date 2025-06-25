import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedCheckboxStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML & CSS/Checkbox',
	argTypes: {},
	render: (args: InputFramedCheckboxStory) => {
		return {
			template: cleanupTemplate(`
<div class="inputFramedWrapper">
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="checkboxAlabel" for="optionA">
					Option A
				</label>
				<span class="checkboxField">
					<input type="checkbox" class="checkboxField-input inputFramed-header-input" aria-labelledby="checkboxAlabel" id="optionA" />
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
					</span>
				</span>
				<div class="inlineMessage">
					<p class="inlineMessage-content">Lorem ipsum dolor</p>
				</div>
			</div>
		</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="checkboxBlabel" for="optionB">
					Option B
				</label>
				<span class="checkboxField">
					<input type="checkbox" class="checkboxField-input inputFramed-header-input" aria-labelledby="checkboxBlabel" id="optionB" />
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
					</span>
				</span>
				<div class="inlineMessage">
					<p class="inlineMessage-content">Lorem ipsum dolor</p>
				</div>
			</div>
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
