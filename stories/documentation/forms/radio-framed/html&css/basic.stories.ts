import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface RadioFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Radio Framed/HTML & CSS/Basic',
	argTypes: {},
	render: (args: RadioFramedBasicStory) => {
		return {
			template: cleanupTemplate(`
<div class="radioFramedWrapper">
	<div class="radioFramed">
		<div class="radioFramed-header">
			<div class="form-field radioFramed-header-field">
				<label class="formLabel radioFramed-header-label" id="radioAlabel" for="optionA">
					Option A
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
	<div class="radioFramed">
		<div class="radioFramed-header">
			<div class="form-field radioFramed-header-field">
				<label class="formLabel radioFramed-header-label" id="radioBlabel" for="optionB">
					Option B
				</label>
				<span class="radioField">
					<input type="radio" class="radioField-input radioFramed-header-input" aria-labelledby="radioBlabel" id="optionB" name="radioGroup" />
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
					</span>
				</span>
			</div>
		</div>
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {};
