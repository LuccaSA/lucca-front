import { SwitchfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	component: SwitchfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [SwitchfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

export const withNgModel: StoryObj<SwitchfieldComponent> = {
	name: 'With NgModel',
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState }) => {
		return {
			props: {
				example: false,
			},
			template: `
<lu-switchfield label="${label}"
required="${required}"
${hiddenLabel ? 'hiddenLabel' : ''}
inlineMessage="${inlineMessage}"
inlineMessageState="${inlineMessageState}"
size="${size}"
[(ngModel)]="example">
</lu-switchfield>

{{example}}`,
			moduleMetadata: {
				imports: [SwitchfieldComponent, FormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
	},
};
export const withReactiveForm: StoryObj<SwitchfieldComponent> = {
	name: 'With ReactiveForm (and Validators.requiredTrue)',
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState }) => {
		return {
			props: {
				form: new FormGroup({
					example: new FormControl(false, [Validators.requiredTrue]),
				}),
			},
			template: `
<form [formGroup]="form">
	<lu-switchfield label="${label}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	formControlName="example">
	</lu-switchfield>
</form>

{{form.value.example}}`,
			moduleMetadata: {
				imports: [SwitchfieldComponent, ReactiveFormsModule],
			},
		};
	},
	args: {
		label: 'Label',
		required: true,
		hiddenLabel: false,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
	},
};
