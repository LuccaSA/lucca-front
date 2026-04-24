import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'input-framed-stories',
	templateUrl: './input-framed.stories.html',
	imports: [FormFieldComponent, InputFramedComponent, RadioGroupInputComponent, RadioComponent, CheckboxInputComponent, GridComponent, GridColumnComponent, IconComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputFramedStory {
	radioDefault = 'A';
	radioTag = 'A';
	radioInfo = 'A';
	radioPanel = 'A';
	radioIllustration = 'A';
	radioSizeL = 'A';
	radioDisabled = 'A';
	checkboxA = true;
	checkboxB = false;
	checkboxDisabledA = true;
	checkboxDisabledB = false;
}

export default {
	title: 'QA/InputFramed',
	component: InputFramedStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<InputFramedStory> = {
	args: {},
	render: template,
};
