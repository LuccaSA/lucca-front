import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'bubble-icon-stories',
	templateUrl: './bubble-icon.stories.html',
	imports: [BubbleIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BubbleIconStory {
	softwarePalettes = ['product', 'pagga', 'poplee', 'coreHR', 'timmi', 'cleemy', 'cc', 'brand'];
	decorativePalettes = ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'watermelon', 'pumpkin', 'pineapple'];
	feedbackPalettes = ['neutral', 'success', 'warning', 'critical'];
}

export default {
	title: 'QA/BubbleIcon',
	component: BubbleIconStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BubbleIconStory> = {
	args: {},
	render: template,
};
