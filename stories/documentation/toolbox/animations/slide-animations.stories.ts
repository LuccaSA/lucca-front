import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSlideAnimation } from '@lucca-front/ng/animations';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'story-slide-animation',
	standalone: true,
	imports: [LuSlideAnimation],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="slidingLeft = !slidingLeft">{{ slidingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingLeft) {
					<div class="animated-block" luSlideAnimation="left">Slide from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right <button class="button mod-S" (click)="slidingRight = !slidingRight">{{ slidingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingRight) {
					<div class="animated-block" luSlideAnimation="right">Slide from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top <button class="button mod-S" (click)="slidingTop = !slidingTop">{{ slidingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingTop) {
					<div class="animated-block" luSlideAnimation="top">Slide from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom <button class="button mod-S" (click)="slidingBottom = !slidingBottom">{{ slidingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingBottom) {
					<div class="animated-block" luSlideAnimation="bottom">Slide from bottom</div>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SlideAnimationStory {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
}

export default {
	title: 'Documentation/Toolbox/Animations/Slide',
	component: SlideAnimationStory,
} as Meta;

export const Slide: StoryObj<SlideAnimationStory> = {
	args: {},
	render: (args) => ({ props: args }),
};

const code = `
import { LuSlideAnimation } from '@lucca-front/ng/animations';

@Component({
	selector: 'story-slide-animation',
	imports: [LuSlideAnimation],
	template: \`
		@if (visible) {
			<div luSlideAnimation="left">Slide from left</div>
		}
	\`,
})
class SlideAnimationStory {
	visible = true;
}`;

Slide.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};

// Composition via `hostDirectives`, without exposing any input: the direction is fixed.
@Component({
	selector: 'slide-card',
	standalone: true,
	hostDirectives: [LuSlideAnimation],
	template: `<ng-content />`,
	styles: `:host { display: block; }`,
})
class SlideCard {}

// Composition via `hostDirectives`, exposing the directive's input (renamed to `direction`).
@Component({
	selector: 'slide-card-directional',
	standalone: true,
	hostDirectives: [{ directive: LuSlideAnimation, inputs: ['luSlideAnimation: direction'] }],
	template: `<ng-content />`,
	styles: `:host { display: block; }`,
})
class SlideCardDirectional {}

@Component({
	selector: 'story-slide-host-directive',
	standalone: true,
	imports: [SlideCard, SlideCardDirectional],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					No input <button class="button mod-S" (click)="fixed = !fixed">{{ fixed ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!fixed) {
					<slide-card class="animated-block">Fixed direction (left)</slide-card>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					With input <button class="button mod-S" (click)="dynamic = !dynamic">{{ dynamic ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!dynamic) {
					<slide-card-directional direction="right" class="animated-block">Direction = right</slide-card-directional>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SlideHostDirectiveStory {
	fixed = false;
	dynamic = false;
}

export const HostDirective: StoryObj<SlideHostDirectiveStory> = {
	args: {},
	render: (args) => ({ props: args, moduleMetadata: { imports: [SlideHostDirectiveStory] }, template: `<story-slide-host-directive />` }),
};

const hostDirectiveCode = `
import { LuSlideAnimation } from '@lucca-front/ng/animations';

// Without inputs: the direction is fixed to the directive default (left).
@Component({
	selector: 'slide-card',
	hostDirectives: [LuSlideAnimation],
	template: \`<ng-content />\`,
})
class SlideCard {}

// With inputs: expose the directive input, renamed to \`direction\`.
@Component({
	selector: 'slide-card-directional',
	hostDirectives: [{ directive: LuSlideAnimation, inputs: ['luSlideAnimation: direction'] }],
	template: \`<ng-content />\`,
})
class SlideCardDirectional {}

// Usage
@if (visible) {
	<slide-card>Fixed direction</slide-card>
	<slide-card-directional direction="right">Direction = right</slide-card-directional>
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
