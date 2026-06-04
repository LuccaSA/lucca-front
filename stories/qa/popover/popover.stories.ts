import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'popover-stories',
	templateUrl: './popover.stories.html',

	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverStory {}

export default {
	title: 'QA/Popover',
	component: PopoverStory,
} as Meta;

export const Basic = {};
