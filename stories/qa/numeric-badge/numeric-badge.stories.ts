import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'numeric-badge-stories',
	templateUrl: './numeric-badge.stories.html',
	styles: ['.numericBadge::after { animation-play-state: paused; }'],
	imports: [NumericBadgeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NumericBadgeStory {}

export default {
	title: 'QA/NumericBadge',
	component: NumericBadgeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NumericBadgeStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<NumericBadgeStory> = {
	args: {},
	render: template,
};
