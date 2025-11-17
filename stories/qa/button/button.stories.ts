import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'button-stories',
	templateUrl: './button.stories.html',
	styles: ['.button::after { animation-play-state: paused; }'],
	imports: [ButtonComponent, NumericBadgeComponent, IconComponent],
})
class ButtonStory {}

export default {
	title: 'QA/Button',
	component: ButtonStory,
} as Meta;

const template: StoryFn<ButtonStory> = () => ({});

export const basic = template.bind({});
