import { FormsModule } from '@angular/forms';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Examples/Angular',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, TextInputComponent, FormsModule, GridColumnComponent, GridComponent, FieldsetComponent, DividerComponent, FormComponent, DividerComponent, FormHeaderComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<form luForm maxWidth>
	<lu-form-header>Form title</lu-form-header>
	<lu-fieldset heading="Fieldset title" helper="Helper message">
		<lu-grid mode="form">
			<lu-grid-column colspan="4">
				<lu-form-field label="Label" inlineMessage="Helper text">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 1 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
	<lu-divider />
	<lu-fieldset heading="Fieldset title" helper="Helper message">
		<lu-grid mode="form">
			<lu-grid-column colspan="4">
				<lu-form-field label="Label" inlineMessage="Helper text">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
			<lu-grid-column colspan="4" [responsive]="{ colspanAtMediaMinXXS: 2 }">
				<lu-form-field label="Label">
					<lu-text-input ngModel [ngModelOptions]="{ standalone: true }" placeholder="Placeholder" />
				</lu-form-field>
			</lu-grid-column>
		</lu-grid>
	</lu-fieldset>
</form>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
