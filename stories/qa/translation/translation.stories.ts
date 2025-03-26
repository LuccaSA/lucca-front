import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'translation-stories',
	standalone: true,
	imports: [FormsModule, FormFieldComponent, LuSimpleSelectInputComponent],
	template: `
		<lu-form-field label="Test">
			<lu-simple-select [ngModel]="" [intl]="{ emptyResults: 'NOPE' }" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TranslationOverrideStory {}

type Story = StoryObj<TranslationOverrideStory>;

export default {
	title: 'QA/Translation/Tests',
	component: TranslationOverrideStory,
} as Meta;

export const Basic: Story = {};
