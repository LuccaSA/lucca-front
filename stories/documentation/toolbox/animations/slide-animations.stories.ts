import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { luSlideAnimationFactory } from '@lucca-front/ng/animations';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'story-slide-animation',
	standalone: true,
	template: `
		<div class="grid mod-auto">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="slidingLeft = !slidingLeft">{{ slidingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingLeft) {
					<div class="animated-block" [@slideAnimation]="'left'">Slide from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right
					<button class="button mod-S" (click)="slidingRight = !slidingRight">{{ slidingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingRight) {
					<div class="animated-block" [@slideAnimation]="'right'">Slide from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top
					<button class="button mod-S" (click)="slidingTop = !slidingTop">{{ slidingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingTop) {
					<div class="animated-block" [@slideAnimation]="'top'">Slide from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom
					<button class="button mod-S" (click)="slidingBottom = !slidingBottom">{{ slidingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingBottom) {
					<div class="animated-block" [@slideAnimation]="'bottom'">Slide from bottom</div>
				}
			</div>
		</div>
	`,
	styleUrl: './animations.scss',
	animations: [luSlideAnimationFactory()],
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
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<SlideAnimationStory> = (args) => ({
	props: args,
});

export const Slide = template.bind({});
Slide.args = {};

const code = `
/* 1. Appeler provideAnimations */
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
	providers: [provideAnimations()]
})
class AppModule {}

/* 2. Utiliser luSlideAnimationFactory() */
@Component({
	selector: 'story-slide-animation',
	template: \`
		<div class="grid">
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Left <button class="button mod-S" (click)="slidingLeft = !slidingLeft">{{ slidingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingLeft) {
					<div class="animated-block" [@slideAnimation]="'left'">Slide from left</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Right
					<button class="button mod-S" (click)="slidingRight = !slidingRight">{{ slidingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingRight) {
					<div class="animated-block" [@slideAnimation]="'right'">Slide from right</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Top
					<button class="button mod-S" (click)="slidingTop = !slidingTop">{{ slidingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingTop) {
					<div class="animated-block" [@slideAnimation]="'top'">Slide from top</div>
				}
			</div>
			<div class="grid-column ng-demo-block">
				<h3 class="pr-u-margin0">
					Bottom
					<button class="button mod-S" (click)="slidingBottom = !slidingBottom">{{ slidingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!slidingBottom) {
					<div class="animated-block" [@slideAnimation]="'bottom'">Slide from bottom</div>
				}
			</div>
		</div>
	\`,
	styleUrl: './animations.scss',
	animations: [luSlideAnimationFactory()],
})
class SlideAnimationStory {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
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
