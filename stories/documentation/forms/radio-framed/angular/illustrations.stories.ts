import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedIllustrationsStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Illustrations',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule, IconComponent],
		}),
	],
	argTypes: {},
	render: (args: InputFramedIllustrationsStory) => {
		return {
			template: cleanupTemplate(`
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<lu-radio value="A" inlineMessage="Helper text">
			Option A
			<ng-container illustration>
				<div style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)" class="pr-u-padding150 u-borderRadiusXL u-displayFlex">
					<lu-icon icon="moneyBag" />
				</div>
			</ng-container>
		</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
