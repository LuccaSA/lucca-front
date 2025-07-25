import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedInfosStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML&CSS/Infos',
	argTypes: {},
	render: (args: InputFramedInfosStory) => {
		return {
			template: cleanupTemplate(`<div class="inputFramedWrapper">
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
			<div class="inputFramed-header-info">Lorem ipsum dolor</div>
		</div>
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
			<div class="inputFramed-header-info">Lorem ipsum dolor</div>
		</div>
	</div>
</div>`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
