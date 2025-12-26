import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'framed-stories',
	templateUrl: './framed.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FramedStory {
	state = input<string>('');
	disabled = input<boolean>(false);
	isRequired = input<boolean>(false);
}

export default {
	title: 'Documentation/Forms/FramedStory',
	component: FramedStory,
	argTypes: {
		state: {
			control: {
				type: 'radio',
				options: ['', 'is-error', 'is-warning', 'is-success'],
			},
		},
	},
} as Meta;

export const Basic: StoryObj<FramedStory> = {
	args: { state: '', disabled: false, isRequired: false },
};
