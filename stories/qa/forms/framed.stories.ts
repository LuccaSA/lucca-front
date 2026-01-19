import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-framed-stories',
	templateUrl: './framed.stories.html',
	imports: [FormlyModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FramedStory {}

export default {
	title: 'QA/Forms/Framed',
	component: FramedStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FramedStory> = {
	args: {},
	render: template,
};
