import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LU_BUBBLE_ICON_DEFAULT_DIRECTION } from '@lucca-front/ng/bubble-icon';
import { CardActionDirective, CardComponent, CardWrapperComponent } from '@lucca-front/ng/card';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'card2-wrapper-grid-stories',
	templateUrl: './card2-wrapper-grid.stories.html',
	imports: [CardComponent, CardActionDirective, CardWrapperComponent],
	// A fixed bubble direction keeps the UI diff stable
	providers: [{ provide: LU_BUBBLE_ICON_DEFAULT_DIRECTION, useValue: 'left' }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Card2WrapperGridStory {}

export default {
	title: 'QA/Card2/Wrapper Grid',
	component: Card2WrapperGridStory,
} as Meta;

export const Basic = {};
