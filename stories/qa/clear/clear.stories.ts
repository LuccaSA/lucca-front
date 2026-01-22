import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'clear-stories',
	templateUrl: './clear.stories.html',
	imports: [ClearComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ClearStory {}

export default {
	title: 'QA/Clear',
	component: ClearStory,
} as Meta;

export const Basic = {};
