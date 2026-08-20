import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@storybook/angular-vite';
//import { SampleComponent } from '@lucca-front/ng/sample';

@Component({
	selector: 'sample-stories',
	templateUrl: './sample.stories.html',
	//imports: [SampleComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SampleStory {}

export default {
	title: 'QA/Sample',
	component: SampleStory,
} as Meta;

export const Basic = {};
