import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';
//import { SampleComponent } from '@lucca-front/ng/sample';

@Component({
	standalone: true,
	selector: 'sample-stories',
	templateUrl: './sample.stories.html',
	//imports: [SampleComponent],
})
class SampleStory {}

export default {
	title: 'QA/Sample',
	component: SampleStory,
} as Meta;

const template: StoryFn<SampleStory> = () => ({});

export const basic = template.bind({});
