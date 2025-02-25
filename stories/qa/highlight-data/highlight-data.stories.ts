import { Component } from '@angular/core';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'highlight-data-stories',
	templateUrl: './highlight-data.stories.html',
	imports: [HighlightDataComponent],
})
class HighlightDataStory {}

export default {
	title: 'QA/Highlight Data',
	component: HighlightDataStory,
} as Meta;

const template: StoryFn<HighlightDataStory> = () => ({});

export const basic = template.bind({});
