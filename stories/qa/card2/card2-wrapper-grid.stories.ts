import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { CardActionDirective, CardComponent, CardWrapperComponent } from '@lucca-front/ng/card';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'card2-wrapper-grid-stories',
	templateUrl: './card2-wrapper-grid.stories.html',
	imports: [CardComponent, CardActionDirective, CardWrapperComponent, BubbleIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Card2WrapperGridStory {}

export default {
	title: 'QA/Card2/Wrapper Grid',
	component: Card2WrapperGridStory,
} as Meta;

export const Basic = {};
