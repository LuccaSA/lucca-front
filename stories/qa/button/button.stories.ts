import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PALETTE, PRODUCT_PALETTE } from '@lucca/prisme/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

type QAState = 'default' | 'loading' | 'success' | 'error' | 'disabled' | 'aria-disabled';

type QAContent = 'text' | 'iconLeft' | 'iconRight' | 'iconOnly' | 'counter' | 'disclosure';

interface QAType {
	label: string;
	luButton: '' | 'outlined' | 'ghost' | 'AI' | 'ghost-invert' | 'AI-invert' | 'text' | 'text-invert';
	classes: string;
	invert?: boolean;
	critical?: boolean;
}

interface QASize {
	label: string;
	size: 'S' | 'XS' | undefined;
}

const TYPES: QAType[] = [
	{ label: 'Default', luButton: '', classes: '' },
	{ label: 'Outlined', luButton: 'outlined', classes: 'mod-outlined' },
	{ label: 'Ghost', luButton: 'ghost', classes: 'mod-ghost' },
	{ label: 'AI', luButton: 'AI', classes: 'mod-AI' },
	{ label: 'Text (depr.)', luButton: 'text', classes: 'mod-text' },
	// Invert types last, so that their dark rows are contiguous
	{ label: 'Ghost invert', luButton: 'ghost-invert', classes: 'mod-ghost mod-invert', invert: true },
	{ label: 'AI invert', luButton: 'AI-invert', classes: 'mod-AI mod-invert', invert: true },
	{ label: 'Text inv. (depr.)', luButton: 'text-invert', classes: 'mod-text mod-invert', invert: true },
];

const CONTENT_CLASSES: Record<QAContent, string> = {
	text: '',
	iconLeft: 'mod-withIcon mod-iconOnLeft',
	iconRight: 'mod-withIcon mod-iconOnRight',
	iconOnly: 'mod-onlyIcon',
	counter: '',
	disclosure: 'mod-disclosure',
};

const SIZES: QASize[] = [
	{ label: 'M', size: undefined },
	{ label: 'S', size: 'S' },
	{ label: 'XS', size: 'XS' },
];

@Component({
	selector: 'button-stories',
	templateUrl: './button.stories.html',
	// Paused animations keep a stable rendering, and keep `.is-error` on Angular buttons (removed on `animationend`)
	styles: [
		'.button, .button::after { animation-play-state: paused; }',
		// Freezes the shake animation on its -3px keyframe (20%)
		'.button.is-error { animation-delay: calc(var(--commons-animations-durations-standard) * -0.2); }',
		// Fixed layout: HTML and Angular columns share the remaining width equally
		'.demo-QAtable { inline-size: 100%; table-layout: fixed; }',
		// Same label column width in every story
		'.demo-QAtable td:first-child { inline-size: 9rem; }',
	],
	imports: [ButtonComponent, NumericBadgeComponent, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonStory {
	readonly element = input<'button' | 'a'>('button');
	readonly state = input<QAState>('default');
	readonly palette = input<string>('none');
	/** Applies `critical` to every button (only visible on hover, focus and active) */
	readonly critical = input(false);

	readonly sizes = SIZES;

	readonly types = computed(() => TYPES.map((type) => ({ ...type, critical: this.critical() })));

	readonly ngState = computed(() => (this.state() === 'disabled' || this.state() === 'aria-disabled' ? 'default' : this.state()));
	readonly disabled = computed(() => this.state() === 'disabled' || this.state() === 'loading');
	readonly ariaDisabled = computed(() => (this.state() === 'aria-disabled' ? 'true' : null));

	htmlClasses(type: QAType, size: QASize, content: QAContent): string {
		return [
			'button',
			type.classes,
			type.critical ? 'mod-critical' : '',
			size.size ? `mod-${size.size}` : '',
			CONTENT_CLASSES[content],
			this.palette() !== 'none' ? `palette-${this.palette()}` : '',
			['loading', 'success', 'error'].includes(this.state()) ? `is-${this.state()}` : '',
		]
			.filter(Boolean)
			.join(' ');
	}
}

export default {
	title: 'QA/Button',
	component: ButtonStory,
	render: (args) => ({ props: args }),
	// Args only select the variation displayed by each story
	parameters: { controls: { disable: true } },
} as Meta<ButtonStory>;

export const Basic: StoryObj<ButtonStory> = {};

export const Hover: StoryObj<ButtonStory> = {
	globals: { pseudo: { hover: true } },
};

export const Active: StoryObj<ButtonStory> = {
	globals: { pseudo: { active: true } },
};

export const FocusVisible: StoryObj<ButtonStory> = {
	globals: { pseudo: { focusVisible: true } },
};

// Same rendering as Basic expected: critical only applies on hover, focus and active
export const CriticalBasic: StoryObj<ButtonStory> = {
	args: { critical: true },
};

export const CriticalHover: StoryObj<ButtonStory> = {
	args: { critical: true },
	globals: { pseudo: { hover: true } },
};

export const CriticalActive: StoryObj<ButtonStory> = {
	args: { critical: true },
	globals: { pseudo: { active: true } },
};

export const CriticalFocusVisible: StoryObj<ButtonStory> = {
	args: { critical: true },
	globals: { pseudo: { focusVisible: true } },
};

export const Loading: StoryObj<ButtonStory> = {
	args: { state: 'loading' },
};

export const Success: StoryObj<ButtonStory> = {
	args: { state: 'success' },
};

export const ErrorState: StoryObj<ButtonStory> = {
	name: 'Error (animation frozen)',
	args: { state: 'error' },
};

export const Disabled: StoryObj<ButtonStory> = {
	args: { state: 'disabled' },
};

// `.is-disabled` and the deprecated `.disabled` share the `[aria-disabled='true']` rule
export const AriaDisabled: StoryObj<ButtonStory> = {
	args: { state: 'aria-disabled' },
};

// An aria-disabled button stays focusable (unlike a disabled one, which can be neither focused nor hovered)
export const AriaDisabledFocusVisible: StoryObj<ButtonStory> = {
	args: { state: 'aria-disabled' },
	globals: { pseudo: { focusVisible: true } },
};

export const Link: StoryObj<ButtonStory> = {
	args: { element: 'a' },
};

export const Palettes: StoryObj<ButtonStory> = {
	name: 'Palettes (interactive control)',
	args: { palette: 'pagga' },
	parameters: { controls: { disable: false, include: ['palette'] } },
	argTypes: {
		palette: {
			options: [...PALETTE, ...PRODUCT_PALETTE],
			control: { type: 'select' },
		},
	},
};
