import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Examples/Angular',
	decorators: [
		moduleMetadata({
			imports: [FormFieldComponent, TextInputComponent, FormsModule],
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
	<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent1">
		<legend class="fieldset-title">
			<span class="fieldset-title-content" id="fieldsetTitleContent1">
				<span class="fieldset-title-content-text">
					Fieldset title
					<span class="fieldset-title-content-text-helper">Helper message</span>
				</span>
			</span>
		</legend>
		<div class="fieldset-content">
			<div class="grid mod-form" style="--grid-colspan: 4">
				<div class="grid-column">
					<lu-form-field label="Label" inlineMessage="Helper text">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
			</div>
		</div>
	</fieldset>
	<hr class="divider" />
	<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent2">
		<legend class="fieldset-title">
			<span class="fieldset-title-content" id="fieldsetTitleContent2">
				<span class="fieldset-title-content-text">
					Fieldset title
					<span class="fieldset-title-content-text-helper">Helper message</span>
				</span>
			</span>
		</legend>
		<div class="fieldset-content">
			<div class="grid mod-form" style="--grid-colspan: 4">
				<div class="grid-column">
					<lu-form-field label="Label" inlineMessage="Helper text">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<lu-form-field label="Label">
						<!-- In real cases, you'll most likely use formControlName here or have a name attribute, standalone: true is just for this example -->
						<lu-text-input ngModel [ngModelOptions]="{standalone: true}" placeholder="Placeholder"></lu-text-input>
					</lu-form-field>
				</div>
			</div>
		</div>
	</fieldset>
</form>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
Basic.args = {};
