import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luSlideAnimationFactory } from '@lucca-front/ng/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'story-slide-animation',
	template: `
		<div class="grid">
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Left <button class="button size-small" (click)="slidingLeft = !slidingLeft">{{ slidingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'left'" *ngIf="!slidingLeft">Slide from left</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Right
					<button class="button size-small" (click)="slidingRight = !slidingRight">{{ slidingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'right'" *ngIf="!slidingRight">Slide from right</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Top
					<button class="button size-small" (click)="slidingTop = !slidingTop">{{ slidingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'top'" *ngIf="!slidingTop">Slide from top</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Bottom
					<button class="button size-small" (click)="slidingBottom = !slidingBottom">{{ slidingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'bottom'" *ngIf="!slidingBottom">Slide from bottom</div>
			</div>
		</div>
	`,
	styleUrls: ['./animations.scss'],
	animations: [luSlideAnimationFactory()],
})
class SlideAnimationStory {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
}

export default {
	title: 'Documentation/Toolbox/Animations',
	component: SlideAnimationStory,
	decorators: [
		moduleMetadata({
			imports: [CommonModule, BrowserAnimationsModule],
			declarations: [SlideAnimationStory],
		}),
	],
} as Meta;

const template: Story<SlideAnimationStory> = (args: SlideAnimationStory) => ({
	props: args,
});

export const Slide = template.bind({});
Slide.args = {};

const code = `
/* 1. Importer BrowserAnimationsModule */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [BrowserAnimationsModule]
})
class AppModule {}

/* 2. Utiliser luSlideAnimationFactory() */
@Component({
	selector: 'story-slide-animation',
	template: \`
		<div class="grid">
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Left <button class="button size-small" (click)="slidingLeft = !slidingLeft">{{ slidingLeft ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'left'" *ngIf="!slidingLeft">Slide from left</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Right
					<button class="button size-small" (click)="slidingRight = !slidingRight">{{ slidingRight ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'right'" *ngIf="!slidingRight">Slide from right</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Top
					<button class="button size-small" (click)="slidingTop = !slidingTop">{{ slidingTop ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'top'" *ngIf="!slidingTop">Slide from top</div>
			</div>
			<div class="grid-md3 ng-demo-block">
				<h3 class="u-marginReset">
					Slide Bottom
					<button class="button size-small" (click)="slidingBottom = !slidingBottom">{{ slidingBottom ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@slideAnimation]="'bottom'" *ngIf="!slidingBottom">Slide from bottom</div>
			</div>
		</div>
	\`,
	styleUrls: ['./animations.scss'],
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
