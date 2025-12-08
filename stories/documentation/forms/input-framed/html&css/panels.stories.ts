import { Meta } from '@storybook/angular';

interface InputFramedPanelsStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML&CSS/Panels',
	argTypes: {},
	render: (args: InputFramedPanelsStory) => {
		return {
			template: `<div class="inputFramedWrapper">
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">
					Option A
				</label>
				<span class="radioField">
					<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioAlabel" id="optionA" name="radioGroup" />
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
					</span>
				</span>
			</div>
		</div>
		<div class="inputFramed-content">Lorem ipsum dolor</div>
	</div>
	<div class="inputFramed">
		<div class="inputFramed-header">
			<div class="form-field inputFramed-header-field">
				<label class="formLabel inputFramed-header-label" id="radioBlabel" for="optionB">
					Option B
				</label>
				<span class="radioField">
					<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioBlabel" id="optionB" name="radioGroup" />
					<span aria-hidden="true" class="radioField-icon">
						<span class="radioField-icon-check"></span>
					</span>
				</span>
			</div>
		</div>
		<div class="inputFramed-content">Lorem <strong>ipsum</strong> dolor</div>
	</div>
</div>`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
