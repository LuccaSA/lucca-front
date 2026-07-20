import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuScaleAnimation } from '@lucca-front/ng/animations';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'story-scale-animation',
	standalone: true,
	imports: [LuScaleAnimation],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Center <button class="button mod-S" (click)="scalingCenter = !scalingCenter">{{ scalingCenter ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingCenter) {
					<div class="animated-block" luScaleAnimation="center">Scale from center</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="scalingLeft = !scalingLeft">{{ scalingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingLeft) {
					<div class="animated-block" luScaleAnimation="left">Scale from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right <button class="button mod-S" (click)="scalingRight = !scalingRight">{{ scalingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingRight) {
					<div class="animated-block" luScaleAnimation="right">Scale from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top <button class="button mod-S" (click)="scalingTop = !scalingTop">{{ scalingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingTop) {
					<div class="animated-block" luScaleAnimation="top">Scale from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom <button class="button mod-S" (click)="scalingBottom = !scalingBottom">{{ scalingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingBottom) {
					<div class="animated-block" luScaleAnimation="bottom">Scale from bottom</div>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScaleAnimationStory {
	scalingCenter = false;
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
}

export default {
	title: 'Documentation/Toolbox/Animations/Scale',
	component: ScaleAnimationStory,
} as Meta;

export const Scale: StoryObj<ScaleAnimationStory> = {
	args: {},
	render: (args) => ({ props: args }),
};

const code = `
import { LuScaleAnimation } from '@lucca-front/ng/animations';

@Component({
	selector: 'story-scale-animation',
	imports: [LuScaleAnimation],
	template: \`
		@if (visible) {
			<div luScaleAnimation="center">Scale from center</div>
		}
	\`,
})
class ScaleAnimationStory {
	visible = true;
}`;

Scale.parameters = {
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
	selector: 'scale-card',
	standalone: true,
	hostDirectives: [LuScaleAnimation],
	template: `<ng-content />`,
	styles: `:host { display: block; }`,
})
class ScaleCard {}

// Composition via `hostDirectives`, exposing the directive's input (renamed to `direction`).
@Component({
	selector: 'scale-card-directional',
	standalone: true,
	hostDirectives: [{ directive: LuScaleAnimation, inputs: ['luScaleAnimation: direction'] }],
	template: `<ng-content />`,
	styles: `:host { display: block; }`,
})
class ScaleCardDirectional {}

@Component({
	selector: 'story-scale-host-directive',
	standalone: true,
	imports: [ScaleCard, ScaleCardDirectional],
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					No input <button class="button mod-S" (click)="fixed = !fixed">{{ fixed ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!fixed) {
					<scale-card class="animated-block">Fixed direction (center)</scale-card>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					With input <button class="button mod-S" (click)="dynamic = !dynamic">{{ dynamic ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!dynamic) {
					<scale-card-directional direction="top" class="animated-block">Direction = top</scale-card-directional>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScaleHostDirectiveStory {
	fixed = false;
	dynamic = false;
}

export const HostDirective: StoryObj<ScaleHostDirectiveStory> = {
	args: {},
	render: (args) => ({ props: args, moduleMetadata: { imports: [ScaleHostDirectiveStory] }, template: `<story-scale-host-directive />` }),
};

const hostDirectiveCode = `
import { LuScaleAnimation } from '@lucca-front/ng/animations';

// Without inputs: the direction is fixed to the directive default (center).
@Component({
	selector: 'scale-card',
	hostDirectives: [LuScaleAnimation],
	template: \`<ng-content />\`,
})
class ScaleCard {}

// With inputs: expose the directive input, renamed to \`direction\`.
@Component({
	selector: 'scale-card-directional',
	hostDirectives: [{ directive: LuScaleAnimation, inputs: ['luScaleAnimation: direction'] }],
	template: \`<ng-content />\`,
})
class ScaleCardDirectional {}

// Usage
@if (visible) {
	<scale-card>Fixed direction</scale-card>
	<scale-card-directional direction="top">Direction = top</scale-card-directional>
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
