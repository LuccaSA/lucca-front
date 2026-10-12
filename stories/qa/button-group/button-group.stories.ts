import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

interface QAGroupType {
	label: string;
	modifier: '' | 'mod-outlined' | 'mod-ghost';
}

interface QAGroupState {
	label: string;
	/** Row class targeted by the forced pseudo-states */
	rowClass: string;
	/** Applied to the second button of each group */
	disabled?: 'disabled' | 'aria-disabled';
}

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
class ButtonGroupStory {
	readonly types: QAGroupType[] = [
		{ label: 'Default', modifier: '' },
		{ label: 'Outlined', modifier: 'mod-outlined' },
		{ label: 'Ghost', modifier: 'mod-ghost' },
	];

	readonly sizes = ['', 'mod-S', 'mod-XS'];

	readonly states: QAGroupState[] = [
		{ label: 'Hover', rowClass: 'qa-hover' },
		{ label: 'Active', rowClass: 'qa-active' },
		{ label: 'Focus visible', rowClass: 'qa-focusVisible' },
		{ label: 'Disabled', rowClass: '', disabled: 'disabled' },
		{ label: 'Aria-disabled', rowClass: 'qa-ariaDisabled', disabled: 'aria-disabled' },
	];

	readonly groupButtons = [0, 1, 2];

	// Every type at rest, then every type in every state
	readonly rows: { label: string; type: QAGroupType; state?: QAGroupState }[] = [
		...this.types.map((type) => ({ label: type.label, type })),
		...this.types.flatMap((type) => this.states.map((state) => ({ label: `${type.label} ${state.label}`, type, state }))),
	];

	buttonClasses(type: QAGroupType, size: string): string {
		return ['button', type.modifier, size].filter(Boolean).join(' ');
	}
}

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
