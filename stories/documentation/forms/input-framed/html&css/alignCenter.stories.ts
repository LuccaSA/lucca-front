import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedAlignCenterStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML&CSS/Align center',
	argTypes: {},
	render: (args: InputFramedAlignCenterStory) => {
		return {
			template: cleanupTemplate(`
<div class="inputFramed mod-alignCenter">
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
		<div class="inputFramed-header-illustration">
				<div style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)" class="pr-u-padding150 pr-u-borderRadiusXL pr-u-displayFlex">
					<span aria-hidden="true" class="lucca-icon icon-moneyBag"></span>
				</div>
		</div>
	</div>
</div>`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
