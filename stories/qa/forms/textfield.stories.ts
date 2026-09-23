import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputAddon, TextInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'forms-textfield-stories',
	templateUrl: './textfield.stories.html',
	imports: [FormFieldComponent, TextInputComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextfieldStory {
	empty = new FormControl('');
	filled = new FormControl('Value');
	disabledEmpty = new FormControl({ value: '', disabled: true });
	disabledFilled = new FormControl({ value: 'Value', disabled: true });

	prefix: TextInputAddon = { content: '$', ariaLabel: 'dollars' };
	suffix: TextInputAddon = { content: '€/j', ariaLabel: 'euros par jour' };

	longHelperText = 'Helper text that is long enough to wrap onto several lines';

	widths = [
		{ value: 10, label: '10 (80px)' },
		{ value: 20, label: '20 (160px)' },
		{ value: 30, label: '30 (240px)' },
		{ value: 40, label: '40 (320px)' },
		{ value: 50, label: '50 (400px)' },
		{ value: 60, label: '60 (480px)' },
	] as const;
}

export default {
	title: 'QA/Forms/Textfield',
	component: TextfieldStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TextfieldStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TextfieldStory> = {
	args: {},
	render: template,
};
