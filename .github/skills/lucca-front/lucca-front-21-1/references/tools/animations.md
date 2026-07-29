# Animations

# Content

**Exemple : Fade**

```html
/* 1. Appeler provideAnimations */
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
	providers: [provideAnimations()]
})
class AppModule {}

/* 2. Utiliser luFadeAnimationFactory() */
@Component({
	selector: 'story-fade-animation',
	template: \`
		<div class="grid">
			<div class="grid-column ng-demo-block" style="--grid-colspan: 3">
				<h3 class="pr-u-margin0">
					Fade
					<button class="button mod-S" (click)="fading = !fading">{{ fading ? 'Show' : 'Hide' }}</button>
				</h3>
				@if (!fading) {
					<div class="animated-block" [@fadeAnimation]>Fade</div>
				}
			</div>
		</div>\`,
	styleUrl: './animations.scss',
	animations: [luFadeAnimationFactory()],
})
class FadeAnimationStory {
	fading = false;
}
```
**Exemple : Scale**

```html
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
}
```
**Exemple : Slide**

```html
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
}
```
