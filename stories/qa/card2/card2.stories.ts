import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { CardActionDirective, CardComponent } from '@lucca-front/ng/card';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'card2-stories',
	templateUrl: './card2.stories.html',
	imports: [CardComponent, CardActionDirective, BubbleIconComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Card2Story {}

export default {
	title: 'QA/Card2/Basic',
	component: Card2Story,
} as Meta;

export const Basic = {};
