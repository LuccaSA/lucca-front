import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { luScaleAnimationFactory } from '@lucca-front/ng/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'story-scale-animation',
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Scale
					<button class="button mod-S" (click)="scalingCenter = !scalingCenter">{{ scalingCenter ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingCenter) {
					<div class="animated-block" [@scaleAnimation]>Scale from center</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="scalingLeft = !scalingLeft">{{ scalingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingLeft) {
					<div class="animated-block" [@scaleAnimation]="'left'">Scale from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right
					<button class="button mod-S" (click)="scalingRight = !scalingRight">{{ scalingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingRight) {
					<div class="animated-block" [@scaleAnimation]="'right'">Scale from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top
					<button class="button mod-S" (click)="scalingTop = !scalingTop">{{ scalingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingTop) {
					<div class="animated-block" [@scaleAnimation]="'top'">Scale from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom
					<button class="button mod-S" (click)="scalingBottom = !scalingBottom">{{ scalingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingBottom) {
					<div class="animated-block" [@scaleAnimation]="'bottom'">Scale from bottom</div>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	animations: [luScaleAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScaleAnimationStory {
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
	scalingCenter = false;
}

export default {
	title: 'Documentation/Toolbox/Animations/Scale',
	component: ScaleAnimationStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template = (args: ScaleAnimationStory) => ({
	props: args,
});

export const Scale: StoryObj<ScaleAnimationStory> = {
	args: {},
	render: template,
};

const code = `
/* 1. Appeler provideAnimations */
Appeler { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
	providers: [provideAnimations()]
})
class AppModule {}

/* 2. Utiliser luScaleAnimationFactory() */
@Component({
	selector: 'story-scale-animation',
	template: \`
		<div class="grid">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Scale
					<button class="button mod-S" (click)="scalingCenter = !scalingCenter">{{ scalingCenter ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingCenter) {
					<div class="animated-block" [@scaleAnimation]>Scale from center</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="scalingLeft = !scalingLeft">{{ scalingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingLeft) {
					<div class="animated-block" [@scaleAnimation]="'left'">Scale from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right
					<button class="button mod-S" (click)="scalingRight = !scalingRight">{{ scalingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingRight) {
					<div class="animated-block" [@scaleAnimation]="'right'">Scale from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top
					<button class="button mod-S" (click)="scalingTop = !scalingTop">{{ scalingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingTop) {
					<div class="animated-block" [@scaleAnimation]="'top'">Scale from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom
					<button class="button mod-S" (click)="scalingBottom = !scalingBottom">{{ scalingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!scalingBottom) {
					<div class="animated-block" [@scaleAnimation]="'bottom'">Scale from bottom</div>
				}
			</div>
		</div>
	\`,
	styleUrl: './animations.scss',
	animations: [luScaleAnimationFactory()],
})
class ScaleAnimationStory {
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
	scalingCenter = false;
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
