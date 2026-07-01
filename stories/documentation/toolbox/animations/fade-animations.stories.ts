import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuFadeAnimation } from '@lucca-front/ng/animations';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'story-fade-animation',
	standalone: true,
	imports: [LuFadeAnimation],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Fade <button class="button mod-S" (click)="fading = !fading">{{ fading ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!fading) {
					<div class="animated-block" luFadeAnimation>Fade in / out</div>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FadeAnimationStory {
	fading = false;
}

export default {
	title: 'Documentation/Toolbox/Animations/Fade',
	component: FadeAnimationStory,
} as Meta;

export const Fade: StoryObj<FadeAnimationStory> = {
	args: {},
	render: (args) => ({ props: args }),
};

const code = `
import { LuFadeAnimation } from '@lucca-front/ng/animations';

@Component({
	selector: 'story-fade-animation',
	imports: [LuFadeAnimation],
	template: \`
		@if (visible) {
			<div luFadeAnimation>Fade in / out</div>
		}
	\`,
})
class FadeAnimationStory {
	visible = true;
}`;

Fade.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};

// Composition via `hostDirectives`. `LuFadeAnimation` has no input, so nothing to expose.
@Component({
	selector: 'fade-card',
	standalone: true,
	hostDirectives: [LuFadeAnimation],
	template: `<ng-content />`,
	styles: `:host { display: block; }`,
})
class FadeCard {}

@Component({
	selector: 'story-fade-host-directive',
	standalone: true,
	imports: [FadeCard],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					hostDirectives <button class="button mod-S" (click)="fading = !fading">{{ fading ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!fading) {
					<fade-card class="animated-block">Fade in / out</fade-card>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FadeHostDirectiveStory {
	fading = false;
}

export const HostDirective: StoryObj<FadeHostDirectiveStory> = {
	args: {},
	render: (args) => ({ props: args, moduleMetadata: { imports: [FadeHostDirectiveStory] }, template: `<story-fade-host-directive />` }),
};

const hostDirectiveCode = `
import { LuFadeAnimation } from '@lucca-front/ng/animations';

// LuFadeAnimation has no input, so hostDirectives composition needs no input mapping.
@Component({
	selector: 'fade-card',
	hostDirectives: [LuFadeAnimation],
	template: \`<ng-content />\`,
})
class FadeCard {}

// Usage
@if (visible) {
	<fade-card>Fade in / out</fade-card>
}`;

HostDirective.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code: hostDirectiveCode,
		},
	},
};
