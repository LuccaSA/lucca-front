import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIconComponent, LU_BUBBLE_ICON_DEFAULT_DIRECTION } from '@lucca-front/ng/bubble-icon';
import { CardActionDirective, CardComponent } from '@lucca-front/ng/card';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'card2-stories',
	templateUrl: './card2.stories.html',
	imports: [CardComponent, CardActionDirective, BubbleIconComponent, LuTooltipTriggerDirective],
	// A fixed bubble direction keeps the UI diff stable
	providers: [{ provide: LU_BUBBLE_ICON_DEFAULT_DIRECTION, useValue: 'left' }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Card2Story {}

export default {
	title: 'QA/Card2/Basic',
	component: Card2Story,
} as Meta;

export const Basic = {};
