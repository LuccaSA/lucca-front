import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { luFadeAnimationFactory } from '@lucca-front/ng/animations';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'story-fade-animation',
	standalone: true,
	imports: [CommonModule],
	template: ` <div class="grid">
		<div class="grid-3@mediaMinXXS ng-demo-block">
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
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: StoryFn<FadeAnimationStory> = (args: FadeAnimationStory) => ({
	props: args,
});

export const Fade = template.bind({});
Fade.args = {};

const code = `
/* 1. Importer BrowserAnimationsModule */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [BrowserAnimationsModule]
})
class AppModule {}

/* 2. Utiliser luFadeAnimationFactory() */
@Component({
	selector: 'story-fade-animation',
	template: \`
		<div class="grid">
			<div class="grid-3@mediaMinXXS ng-demo-block">
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
