import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'button-group-stories',
	templateUrl: './button-group.stories.html',
	styles: [
		// Fixed layout: the HTML column takes the remaining width
		'.demo-QAtable { inline-size: 100%; table-layout: fixed; }',
		// Fits the longest label without wrapping
		'.demo-QAtable td:first-child { inline-size: 11rem; }',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonGroupStory {}

export default {
	title: 'QA/ButtonGroup',
	component: ButtonGroupStory,
} as Meta;

const template = () => ({});

// The second button of each state row gets the forced state, so that it overlaps its neighbours.
// Aria-disabled rows also force hover and focus (an aria-disabled button stays focusable), to check that it is excluded.
// Disabled rows force nothing: a disabled button can be neither hovered nor focused.
const secondButton = (rowClass: string) => `.${rowClass} .button-group-item:nth-child(2) .button`;

export const Basic: StoryObj<ButtonGroupStory> = {
	args: {},
	render: template,
	globals: {
		pseudo: {
			hover: [secondButton('qa-hover'), secondButton('qa-ariaDisabled')],
			active: [secondButton('qa-active')],
			focusVisible: [secondButton('qa-focusVisible'), secondButton('qa-ariaDisabled')],
		},
	},
};
