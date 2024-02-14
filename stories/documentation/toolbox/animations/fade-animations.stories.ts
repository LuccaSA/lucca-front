import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { luFadeAnimationFactory } from '@lucca-front/ng/animations';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'story-fade-animation',
	standalone: true,
	imports: [CommonModule],
	template: ` <div class="grid">
		<div class="grid-column ng-demo-block" style="--grid-colspan: 3">
			<h3 class="u-margin0">
				Fade
				<button class="button mod-S" (click)="fading = !fading">{{ fading ? 'Show' : 'Hide' }}</button>
			</h3>
			<div class="animated-block" [@fadeAnimation] *ngIf="!fading">Fade</div>
		</div>
	</div>`,
	styleUrls: ['./animations.scss'],
	animations: [luFadeAnimationFactory()],
})
class FadeAnimationStory {
	fading = false;
}

export default {
	title: 'Documentation/Toolbox/Animations/Fade',
	component: FadeAnimationStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<FadeAnimationStory> = (args) => ({
	props: args,
});

export const Fade = template.bind({});
Fade.args = {};

const code = `
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
				<h3 class="u-margin0">
					Fade
					<button class="button mod-S" (click)="fading = !fading">{{ fading ? 'Show' : 'Hide' }}</button>
				</h3>
				<div class="animated-block" [@fadeAnimation] *ngIf="!fading">Fade</div>
			</div>
		</div>\`,
	styleUrls: ['./animations.scss'],
	animations: [luFadeAnimationFactory()],
})
class FadeAnimationStory {
	fading = false;
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
