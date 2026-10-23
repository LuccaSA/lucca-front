import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxComponent } from '@lucca-front/ng/box';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'box-stories',
	templateUrl: './box.stories.html',
	imports: [BoxComponent, BubbleIconComponent, LuSafeExternalSvgPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BoxStory> = {
	args: {},
	render: template,
};
