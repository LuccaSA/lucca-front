import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { provideRouter, Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { Component, inject, Injectable, signal } from '@angular/core';
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
import { ButtonComponent } from '@lucca-front/ng/button';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CalloutComponent } from '@lucca-front/ng/callout';

@Injectable()
class DataProvider {
	dummy = signal(0);
	dialogOut = signal<{ dataNum?: number; dataString?: string }>({});
}

@Component({
	standalone: true,
	template: ``,
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
		ReactiveFormsModule,
		NumberInputComponent,
		TextInputComponent,
		FormFieldComponent,
	],
	template: `
		<lu-dialog>
			<form [formGroup]="form" class="dialog-formOptionnal">
				<lu-dialog-header> Dialog opened by route </lu-dialog-header>
				<lu-dialog-content>
					<lu-form-field label="Data received by dialog">
						<lu-number-input [formControl]="form.controls.dataNum"></lu-number-input>
					</lu-form-field>
					<lu-form-field label="Additionnal data to submit">
						<lu-text-input [formControl]="form.controls.dataString"></lu-text-input>
					</lu-form-field>
				</lu-dialog-content>
				<lu-dialog-footer>
					<div class="footer-actions">
						<button type="submit" (click)="submit(); $event.preventDefault()">Submit</button>
						<button type="button" luDialogDismiss>Dismiss</button>
					</div>
				</lu-dialog-footer>
			</form>
		</lu-dialog>
	`,
})
class TestDialogComponent {
	data = injectDialogData<number>();
	ref = injectDialogRef<{ dataNum?: number; dataString?: string }>();

	form = new FormGroup({
		dataNum: new FormControl<number | null>(this.data),
		dataString: new FormControl<string | null>(''),
	});

	submit() {
		this.ref.close(this.form.value);
	}
}

@Component({
	selector: 'dialog-routing-stories',
	standalone: true,
	template: `
		<div class="pr-u-marginBottom200">
			<button luButton type="button" routerLink="/dialog">Navigate to /dialog</button>
		</div>

		<div class="card">
			<div class="card-content">
				<h2 class="card-title">Dialog data out</h2>
				<p>{{ service.dialogOut() | json }}</p>
			</div>
		</div>

		<div class="card">
			<div class="card-content">
				<h2 class="card-title">Outlet</h2>
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	imports: [RouterOutlet, RouterLink, JsonPipe, ButtonComponent],
})
class DialogRoutingStory {
	service = inject(DataProvider);
}

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
		path: 'dialog',
		dataFactory: (service = inject(DataProvider)) => service.dummy(),
		dialogRouteConfig: {
			// Can be overridden here
		},
	}),
	{ path: 'closed', component: ClosedComponent },
	{ path: 'dismissed', component: DismissedComponent },
	{ path: '**', component: EmptyComponent },
];

export default {
	title: 'Documentation/Overlays/Dialog/Routing',
	component: DialogRoutingStory,
	decorators: [applicationConfig({ providers: [provideRouter(routes), DataProvider] })],
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
	<div class="pr-u-marginBottom200">
		<button luButton type="button" routerLink="/dialog">Navigate to /dialog</button>
	</div>

	<div class="card">
		<div class="card-content">
			<h2 class="card-title">Dialog data out</h2>
			<p>{{ service.dialogOut() | json }}</p>
		</div>
	</div>

	<div class="card">
		<div class="card-content">
			<h2 class="card-title">Outlet</h2>
			<router-outlet></router-outlet>
		</div>
	</div>
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
