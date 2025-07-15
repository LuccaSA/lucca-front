import { AsyncPipe } from '@angular/common';
import { provideRouter, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { timer } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
		<a luLink="/first">Go to first page</a>
		<br />
		<a luLink="/second">Go to second page</a>
		<br />
		<a luLink [href]="url" target="_blank" external>Go to external page</a>
		<br />
		<a [luLink]="url" target="_blank" external>Go to external page as luLink input</a>
		<router-outlet></router-outlet>
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
