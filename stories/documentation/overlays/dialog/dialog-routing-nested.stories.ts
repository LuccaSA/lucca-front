import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideRouter, Router, RouterLink, RouterOutlet, Routes, withHashLocation, withViewTransitions } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	dialogRouteFactory,
	provideDialogRoutingReuseStrategy,
} from '@lucca-front/ng/dialog';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { map } from 'rxjs';

@Component({
	template: `No route matched`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyComponent {}

@Component({
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, ButtonComponent, DialogDismissDirective],
	template: `
		<lu-dialog stacked>
			<lu-dialog-header>
				<h1>Nested sub-dialog</h1>
			</lu-dialog-header>
			<lu-dialog-content>
				Close me with the browser back button (or the one below): the detail dialog underneath must still be there.
				<div class="pr-u-marginBlockStart200">
					<button luButton type="button" (click)="location.back()">History back</button>
				</div>
			</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button luButton="outline" type="button" luDialogDismiss>Dismiss</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SubDialogComponent {
	location = inject(Location);
}

@Component({
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, ButtonComponent, LinkComponent, DialogDismissDirective, RouterOutlet],
	template: `
		<lu-dialog stacked>
			<lu-dialog-header>
				<h1>Detail dialog</h1>
			</lu-dialog-header>
			<lu-dialog-content>
				<a [luLink]="['./', 'sub']" [queryParamsHandling]="'preserve'">Open the nested sub-dialog</a>
				<!-- Anchor for the nested dialog route -->
				<router-outlet />
			</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button luButton="outline" type="button" luDialogDismiss>Dismiss</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DetailDialogComponent {}

@Component({
	selector: 'dialog-routing-nested-stories',
	template: `
		<p>
			Current URL: <strong>{{ url() }}</strong>
		</p>
		<ol>
			<li>Open the detail dialog, then the nested sub-dialog from inside it.</li>
			<li>Navigate back in history: the sub-dialog closes, the detail dialog must stay open — its route is still active.</li>
		</ol>
		<button luButton type="button" routerLink="/detail/12">Navigate to /detail/12</button>
		<router-outlet />
	`,
	imports: [RouterOutlet, RouterLink, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DialogRoutingNestedStory {
	router = inject(Router);

	url = toSignal(this.router.events.pipe(map(() => this.router.url)), { initialValue: this.router.url });
}

const detailDialogRoute = dialogRouteFactory(DetailDialogComponent, {
	dialogConfig: {
		mode: 'drawer',
		size: 'XL',
	},
});

const subDialogRoute = dialogRouteFactory(SubDialogComponent, {
	dialogConfig: {
		mode: 'drawer',
		size: 'M',
	},
});

const routes: Routes = [
	detailDialogRoute({
		path: 'detail/:id',
		dialogRouteConfig: {
			children: [subDialogRoute({ path: 'sub' })],
		},
	}),
	{ path: '**', component: EmptyComponent },
];

export default {
	title: 'Documentation/Overlays/Dialog/Routing nested',
	component: DialogRoutingNestedStory,
} as Meta;

const Template = (args: DialogRoutingNestedStory) => ({
	props: args,
});

// Disable controls as they are not modifiable because of ComponentWrapper
const parameters = { controls: { include: [] } };

// Hash location keeps the router inside the storybook iframe URL, so a history back is a real
// same-document popstate (a path-based URL would make the iframe reload instead).
export const WithoutViewTransitions: StoryObj<DialogRoutingNestedStory> = {
	args: {},
	render: Template,
	parameters,
	decorators: [applicationConfig({ providers: [provideDialogRoutingReuseStrategy(), provideRouter(routes, withHashLocation())] })],
};

// Same scenario with the router's view transitions on: navigations animate, and the history back
// over the nested dialog must still keep the detail dialog open.
export const WithViewTransitions: StoryObj<DialogRoutingNestedStory> = {
	args: {},
	render: Template,
	parameters,
	decorators: [applicationConfig({ providers: [provideDialogRoutingReuseStrategy(), provideRouter(routes, withHashLocation(), withViewTransitions())] })],
};
