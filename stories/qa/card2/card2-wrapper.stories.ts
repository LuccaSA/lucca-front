import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CardActionDirective, CardComponent, CardWrapperComponent } from '@lucca-front/ng/card';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'card2-wrapper-stories',
	templateUrl: './card2-wrapper.stories.html',
	imports: [CardComponent, CardActionDirective, CardWrapperComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Card2WrapperStory {}

export default {
	title: 'QA/Card2/Wrapper',
	component: Card2WrapperStory,
} as Meta;

export const Basic = {};
