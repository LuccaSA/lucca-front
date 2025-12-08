import { Component } from '@angular/core';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'scroll-box-stories',
	templateUrl: './scroll-box.stories.html',
	imports: [ScrollBoxComponent],
})
class ScrollBoxStory {}

export default {
	title: 'QA/Scroll-Box',
	component: ScrollBoxStory,
} as Meta;

const template: StoryFn<ScrollBoxStory> = () => ({});

export const basic = template.bind({});
