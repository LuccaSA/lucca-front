import { JsonPipe } from '@angular/common';
import { Component, computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, provideRouter, Router, RouterLink, RouterOutlet, Routes, withComponentInputBinding } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import {
	DialogCloseDirective,
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	dialogRouteFactory,
	injectDialogData,
	injectDialogRef,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, NumberInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { map } from 'rxjs';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

@Injectable()
class DataProvider {
	dummy = signal(42);
	dialogOut = signal<{ dataNum?: number; dataString?: string }>({});
}

@Component({
	standalone: true,
	template: `Empty component, no route matched`,
})
class EmptyComponent {}

@Component({
	standalone: true,
	imports: [CalloutComponent],
	template: `<lu-callout heading="" size="M" state="success">dialog onClosed() called</lu-callout>`,
})
class ClosedComponent {}

@Component({
	standalone: true,
	imports: [CalloutComponent],
	template: `<lu-callout heading="" size="M" state="error">dialog onDismissed() called</lu-callout>`,
})
class DismissedComponent {}

@Component({
	standalone: true,
	imports: [
		DialogComponent,
		DialogHeaderComponent,
		DialogContentComponent,
		DialogFooterComponent,
		ButtonComponent,
		DialogDismissDirective,
		DialogCloseDirective,
		NumberInputComponent,
		TextInputComponent,
		FormFieldComponent,
		CheckboxInputComponent,
		FormsModule,
		StoryModelDisplayComponent,
	],
	template: `
		<lu-dialog>
			<form class="dialog-inside-formOptional">
				<lu-dialog-header>
					<h1>Dialog opened by route</h1>
				</lu-dialog-header>
				<lu-dialog-content>
					<button luButton (click)="router.navigateByUrl('/')">Navigate away</button>
					<lu-form-field label="Data received by dialog">
						<lu-number-input [(ngModel)]="dataNum" name="num" />
					</lu-form-field>
					<lu-form-field label="Additionnal data to submit" class="pr-u-marginBlockStart200">
						<lu-text-input [(ngModel)]="dataString" name="string" />
					</lu-form-field>
					<lu-form-field label="I agree to allow this dialog to close" class="pr-u-marginBlockStart200">
						<lu-checkbox-input [(ngModel)]="allowThisDialogToClose" name="canDeactivate" />
					</lu-form-field>
				</lu-dialog-content>
				<lu-dialog-footer>
					<div class="footer-actions">
						<button luButton type="submit" (click)="submit(); $event.preventDefault()">Submit</button>
						<button luButton="outline" type="button" luDialogDismiss>Dismiss</button>
					</div>
				</lu-dialog-footer>
			</form>
		</lu-dialog>
	`,
})
class TestDialogComponent {
	data = injectDialogData<number>();
	ref = injectDialogRef<{ dataNum?: number; dataString?: string }>();
	router = inject(Router);
	route = inject(ActivatedRoute);

	allowThisDialogToClose = signal(true);

	dataNum = signal(this.data);
	dataString = signal('');

	formValue = computed(() => ({
		dataNum: this.dataNum(),
		dataString: this.dataString(),
	}));

	submit() {
		this.ref.close(this.formValue());
	}
}

@Component({
	selector: 'dialog-routing-stories',
	standalone: true,
	template: `
		<div class="pr-u-marginBlockEnd200">
			<p>
				Current URL: <strong>{{ url() }}</strong>
			</p>
			<button luButton type="button" routerLink="/dialog" [queryParams]="{ lol: 12 }">Navigate to /dialog</button>
		</div>

		<p class="pr-u-marginBlockStart200">Dialog data out</p>
		<pr-story-model-display class="pr-u-marginBlockStart0">{{ service.dialogOut() | json }}</pr-story-model-display>

		<p class="pr-u-marginBlockStart200">Outlet</p>
		<router-outlet />
	`,
	imports: [RouterOutlet, RouterLink, JsonPipe, ButtonComponent, StoryModelDisplayComponent],
})
class DialogRoutingStory {
	service = inject(DataProvider);

	router = inject(Router);

	url = toSignal(this.router.events.pipe(map(() => this.router.url)), { initialValue: this.router.url });
}

const dialogRoute = dialogRouteFactory(TestDialogComponent, {
	dialogConfig: {
		modal: true,
		size: 'M',
	},
	dialogRouteConfig: {
		onClosed: (onClosedData) => {
			inject(DataProvider).dialogOut.set(onClosedData);
			return inject(Router).navigate(['closed']);
		},
		onDismissed: () => inject(Router).navigate(['dismissed']),
	},
});

const routes: Routes = [
	dialogRoute({
		path: 'dialog',
		dataFactory: () => inject(DataProvider).dummy(),
		dialogRouteConfig: {
			// Can be overridden here
			canDeactivate: [(c) => c.allowThisDialogToClose()],
		},
	}),
	{ path: 'closed', component: ClosedComponent },
	{ path: 'dismissed', component: DismissedComponent },
	{ path: '**', component: EmptyComponent },
];

export default {
	title: 'Documentation/Overlays/Dialog/Routing',
	component: DialogRoutingStory,
	decorators: [applicationConfig({ providers: [provideRouter(routes, withComponentInputBinding()), DataProvider] })],
} as Meta;

const Template: StoryFn<DialogRoutingStory> = (args) => ({
	props: args,
});

const code = `
// PROVIDERS
const providers = [provideRouter(routes), DataProvider];

// ROUTES
// dialogRoute can be used for multiple routes
const dialogRoute = dialogRouteFactory(TestDialogComponent, {
	dialogConfig: {
		modal: true,
		size: 'M',
	},
	dialogRouteConfig: {
		onClosed: (onClosedData, router = inject(Router), service = inject(DataProvider)) => {
			service.dialogOut.set(onClosedData);
			return router.navigate(['closed']);
		},
		onDismissed: (router = inject(Router)) => router.navigate(['dismissed']),
	},
});

const routes: Routes = [
	dialogRoute({
// specify path of routed dialog
		path: 'dialog',
// dataFactory is mandatory if routed dialog require data (use: injectDialogData)
		dataFactory: (service = inject(DataProvider)) => service.dummy(),
		// dialogRouteConfig can be overridden here
		dialogRouteConfig: {},
	}),
	{ path: 'closed', component: ClosedComponent },
	{ path: 'dismissed', component: DismissedComponent },
	{ path: '**', component: EmptyComponent },
];

// Service to communicate with dialog, could be a shared store
@Injectable()
class DataProvider {
	dummy = signal(0);
	dialogOut = signal<{ dataNum?: number; dataString?: string }>({});
}

// Components in sub routes
@Component({
	standalone: true,
	imports: [CalloutComponent],
	template: \`<lu-callout heading="" size="M" state="success">dialog onClosed() called</lu-callout>\`,
})
class ClosedComponent {}

@Component({
	standalone: true,
	imports: [CalloutComponent],
	template: \`<lu-callout heading="" size="M" state="error">dialog onDismissed() called</lu-callout>\`,
})
class DismissedComponent {}

// Story
@Component({
	selector: 'dialog-routing-stories',
	standalone: true,
	template: \`
	<button luButton type="button" routerLink="/dialog">Navigate to /dialog</button>
\`,
	imports: [RouterOutlet, RouterLink, JsonPipe, ButtonComponent],
})
class DialogRoutingStory {
	service = inject(DataProvider);
}
`;

export const Basic = Template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
