import { Component } from '@angular/core';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'scroll-box-stories',
	templateUrl: './scroll-box.stories.html',
	imports: [ScrollBoxComponent],
})
class ScrollBoxStory {}

export default {
	title: 'QA/ScrollBox',
	component: ScrollBoxStory,
} as Meta;

const template = () => ({});

export const basic: StoryObj<ScrollBoxStory> = {
  args: {},
  render: template,
}
