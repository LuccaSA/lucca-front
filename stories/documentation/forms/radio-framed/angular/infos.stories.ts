import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface RadioFramedInfosStory {}

export default {
	title: 'Documentation/Forms/Radio Framed/Angular/Infos',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule, IconComponent],
		}),
	],
	argTypes: {},
	render: (args: RadioFramedInfosStory) => {
		return {
			template: cleanupTemplate(`
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<lu-radio value="A">
			Option A
			<ng-container info>Lorem ipsum dolor</ng-container>
		</lu-radio>
		<lu-radio value="B">
			Option B
			<ng-container info>Lorem ipsum dolor</ng-container>
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
