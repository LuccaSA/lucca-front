import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { SwitchInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'forms-switch-stories',
	templateUrl: './switch.stories.html',
	imports: [FormsModule, FormFieldComponent, SwitchInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SwitchStory {
	switch = false;
	switchChecked = true;
}

export default {
	title: 'QA/Forms/Switch',
	component: SwitchStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SwitchStory> = {
	args: {},
	render: template,
};
