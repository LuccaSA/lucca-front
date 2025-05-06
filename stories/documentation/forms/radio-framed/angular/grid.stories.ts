import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface RadioFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Radio Framed/Angular/Grid',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, RadioGroupInputComponent, RadioComponent, FormsModule],
		}),
	],
	argTypes: {},
	render: (args: RadioFramedBasicStory) => {
		return {
			template: cleanupTemplate(`
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example" framed>
		<div class="grid mod-autoAtMediaMinXXS">
			<lu-radio class="grid-column" value="A">Option A</lu-radio>
			<lu-radio class="grid-column" value="B">Option B</lu-radio>
		</div>
	</lu-radio-group-input>
</lu-form-field>
<br />
<lu-form-field label="Label">
	<lu-radio-group-input [(ngModel)]="example2" framed>
		<div class="grid" [attr.style]="'--grid-columns: 2; --grid-colspan: 2'">
			<lu-radio class="grid-column" value="A" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">Option A</lu-radio>
			<lu-radio class="grid-column" value="B" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">Option B</lu-radio>
			<lu-radio class="grid-column" value="C" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">Option C</lu-radio>
			<lu-radio class="grid-column" value="D" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">Option D</lu-radio>
		</div>
	</lu-radio-group-input>
</lu-form-field>
`),
		};
	},
} as Meta;

export const Basic = {};
