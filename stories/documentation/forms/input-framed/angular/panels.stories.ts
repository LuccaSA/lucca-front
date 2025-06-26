import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedPanelsStory {}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Panels',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule, IconComponent],
		}),
	],
	argTypes: {},
	render: (args: InputFramedPanelsStory) => {
		return {
			template: cleanupTemplate(`<ng-template #optionBportal>Lorem <strong>ipsum</strong> dolor</ng-template>
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<lu-radio value="A" framedPortal="Lorem ipsum dolor">Option A</lu-radio>
		<lu-radio value="B" [framedPortal]="optionBportal">Option B</lu-radio>
	</lu-radio-group-input>
</lu-form-field>`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
