import { Component } from '@angular/core';
import { Meta } from '@storybook/angular';
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

export const Basic = {};
