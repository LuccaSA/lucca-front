import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Examples/Angular',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, TextInputComponent, FormsModule, GridColumnComponent, GridComponent, FieldsetComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<form class="form">
	<header class="form-header">
		<h1 class="form-header-title">Form title</h1>
		<!--<span class="form-header-mandatory" aria-hidden="true"><sup class="form-header-mandatory-asterisk">*</sup> Champs obligatoires</span>-->
	</header>
	<lu-fieldset heading="Fieldset title" helper="Helper message">
		<lu-grid mode="form">
			<lu-grid-column colspan="4">
				<lu-form-field label="Label" inlineMessage="Helper text">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
	<hr class="divider" />
	<lu-fieldset heading="Fieldset title" helper="Helper message">
		<lu-grid mode="form">
			<lu-grid-column colspan="4">
				<lu-form-field label="Label" inlineMessage="Helper text">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
					<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
</form>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
Basic.args = {};
