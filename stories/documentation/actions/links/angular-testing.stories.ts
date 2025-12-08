import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'first-page',
	template: 'First page it is !',
})
class FirstPageComponent {}

@Component({
	selector: 'second-page',
	template: 'And this is the second page !',
})
class SecondPageComponent {}

@Component({
	selector: 'base-component',
	template: `
		<div>
			<a luLink="/first">Go to /first</a>
			<br />
			<a luLink="/second">Go to /second</a>
			<br />
			<a luLink [href]="url" target="_blank" external>Go to https://example.org</a>
		</div>
		<router-outlet />
	`,
	imports: [LinkComponent, RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BaseComponent {
	public url = 'https://example.org';
}

const routes: Routes = [
	{ path: 'first', component: FirstPageComponent },
	{ path: 'second', component: SecondPageComponent },
	{ path: 'iframe.html', redirectTo: 'first', pathMatch: 'full' },
];

export default {
	title: 'Documentation/Actions/Link/Angular/TEST',
	decorators: [
		applicationConfig({
			providers: [provideRouter(routes)],
		}),
	],
	component: BaseComponent,
} as Meta;

export const Basic: StoryObj = {};
