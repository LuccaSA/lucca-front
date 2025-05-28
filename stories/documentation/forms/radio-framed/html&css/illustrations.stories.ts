import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedIllustrationsStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML&CSS/Illustrations',
	argTypes: {},
	render: (args: InputFramedIllustrationsStory) => {
		return {
			template: cleanupTemplate(`
<div class="inputFramed">
	<div class="inputFramed-header">
		<div class="form-field inputFramed-header-field">
			<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">
				Option A
			</label>
			<span class="radioField">
				<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioAlabel radioAmessage" id="optionA" name="radioGroup" />
				<span aria-hidden="true" class="radioField-icon">
					<span class="radioField-icon-check"></span>
				</span>
			</span>
			<div id="radioAmessage" class="inlineMessage"><p class="inlineMessage-content">Helper text</p></div>
		</div>
		<div class="inputFramed-header-illustration">
				<div style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)" class="pr-u-padding150 u-borderRadiusXL u-displayFlex">
					<span aria-hidden="true" class="lucca-icon icon-moneyBag"></span>
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
