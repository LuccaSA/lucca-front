import { Component } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-framed-stories',
	templateUrl: './framed.stories.html',
	imports: [FormlyModule],
})
class FramedStory {}

export default {
	title: 'QA/Forms/Framed',
	component: FramedStory,
} as Meta;

const template: StoryFn<FramedStory> = () => ({});

export const basic = template.bind({});
