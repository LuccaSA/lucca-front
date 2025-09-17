import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Route, Router, RouterFeatures, RouterOutlet } from '@angular/router';
import { injectDialogData, LuDialogRef } from '../model';

import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import type { LuDialogService } from '../dialog.service';
import { dialogRouteFactory } from './dialog-routing.utils';

let dialogService: LuDialogService;
let dialogRef: LuDialogRef<any>;

let openDialogs = 0;

jest.mock('../dialog.providers', () => {
	const { LuDialogService } = jest.requireActual('../dialog.service');
	return {
		provideLuDialog: () => ({
			provide: LuDialogService,
			useFactory: () => {
				dialogService = new LuDialogService();
				const originalOpen = dialogService.open.bind(dialogService);
				jest.spyOn(dialogService, 'open').mockImplementation((config) => {
					openDialogs++;
					dialogRef = originalOpen(config);
					jest.spyOn(dialogRef, 'close');
					jest.spyOn(dialogRef, 'dismiss');
					return dialogRef;
				});
				return dialogService;
			},
		}),
	};
});

interface DialogRoutingTestDialogData {
	foo: string;
}

@Component({
	selector: 'pr-dialog-routing-test',
	template: '',
})
class DialogRoutingTestComponent {
	dialogData = injectDialogData<DialogRoutingTestDialogData>();
}

@Injectable()
class ProvidedInParentComponentService {
	value = 'provided-in-parent';
}

@Injectable()
class ProvidedInParentRouteService {
	value = 'provided-in-parent-route';
}

@Component({
	selector: 'pr-parent',
	imports: [RouterOutlet],
	providers: [ProvidedInParentComponentService],
	template: '<router-outlet></router-outlet>',
})
class ParentComponent {}

@Component({
	selector: 'pr-dialog-routing-test',
	template: '',
})
class DialogRoutingTestWithParentDIComponent {
	parentService = inject(ProvidedInParentComponentService);
	routeService = inject(ProvidedInParentRouteService);
}

@Component({
	selector: 'pr-dialog-routing-with-router-outlet-test',
	imports: [RouterOutlet],
	template: '<router-outlet />',
})
class DialogRoutingWithRouterOutletTestComponent {}

@Component({
	selector: 'pr-app-test',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
})
class AppTestComponent {}

describe('dialog-routing.utils', () => {
	describe('dialogRouteFactory', () => {
		const guard1 = jest.fn(() => true);
		const guard2 = jest.fn(() => true);

		beforeEach(() => {
			guard1.mockReset();
			guard2.mockReset();
			openDialogs = 0;
		});

		const addTestRoute = dialogRouteFactory(DialogRoutingTestComponent, {
			dialogRouteConfig: {
				canActivate: [guard1],
			},
		});

		it('should work with synchronous data', async () => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => ({ foo: 'bar' }),
			});

			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test/bar');
			fixture.detectChanges();

			// Assert
			expect(dialogService.open).toHaveBeenCalledTimes(1);
			expect(dialogService.open).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'bar' },
				}),
			);
		});

		it('should work with Promise data', async () => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => Promise.resolve({ foo: 'baz' }),
			});

			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test/baz');
			fixture.detectChanges();

			// Assert
			expect(dialogService.open).toHaveBeenCalledTimes(1);
			expect(dialogService.open).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'baz' },
				}),
			);
		});

		it('should work with observable data', async () => {
			// Arrange
			const data$ = new Subject<{ foo: string }>();

			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => data$,
			});

			const { router, fixture } = initTest(route);

			// Act
			void router.navigateByUrl('/test/bar');
			await Promise.resolve(); // Wait a tick for router to call dataFactory
			data$.next({ foo: 'bar' });
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(dialogService.open).toHaveBeenCalledTimes(1);
			expect(dialogService.open).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'bar' },
				}),
			);
		});

		it('should work with a guard added on both factoryConfig and factoryCall', async () => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => ({ foo: 'bar' }),
				dialogRouteConfig: {
					canActivate: [guard2],
				},
			});

			const { router } = initTest(route);

			// Act
			await router.navigateByUrl('/test/bar');

			// Assert
			expect(guard1).toHaveBeenCalledTimes(1);
			expect(guard2).toHaveBeenCalledTimes(1);
		});

		it('should call canDeactivate guards when a navigation occurs', async () => {
			// Arrange
			const canDeactivateGuard1 = jest.fn(() => true);
			const canDeactivateGuard2 = jest.fn(() => true);

			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => ({ foo: 'bar' }),
				dialogRouteConfig: {
					canDeactivate: [canDeactivateGuard1, canDeactivateGuard2],
				},
			});
			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test/bar');
			fixture.detectChanges();

			// Navigate away to trigger canDeactivate
			await router.navigateByUrl('/');

			// Assert
			expect(canDeactivateGuard1).toHaveBeenCalledTimes(1);
			expect(canDeactivateGuard2).toHaveBeenCalledTimes(1);
			expect(dialogRef.dismiss).toHaveBeenCalledTimes(1);
		});

		it('should keep dialog opened when canDeactivate return false', async () => {
			// Arrange
			const canDeactivateGuard = jest.fn(() => false);

			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => ({ foo: 'bar' }),
				dialogRouteConfig: {
					canDeactivate: [canDeactivateGuard],
				},
			});
			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test/bar');
			fixture.detectChanges();

			// Navigate away to trigger canDeactivate
			await router.navigateByUrl('/');

			// Assert
			expect(canDeactivateGuard).toHaveBeenCalledTimes(1);
			expect(dialogRef.dismiss).not.toHaveBeenCalled();
		});

		it('should support children', async () => {
			// Arrange
			const addTestRouteWithChildren = dialogRouteFactory(DialogRoutingWithRouterOutletTestComponent, {
				dialogRouteConfig: {
					children: [
						{
							path: 'child1',
							component: Child1Component,
						},
						{
							path: 'child2',
							component: Child2Component,
						},
						{
							path: '',
							pathMatch: 'full',
							redirectTo: 'child1',
						},
					],
				},
			});
			const route = addTestRouteWithChildren({
				path: 'test',
			});

			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(router.url).toBe('/test/child1');
			expect(fixture.debugElement.parent.query(By.directive(Child1Component))).toBeTruthy();
			expect(fixture.debugElement.parent.query(By.directive(Child2Component))).toBeFalsy();
			expect(dialogService.open).toHaveBeenCalledTimes(1);

			// Act 2
			await router.navigateByUrl('/test/child2');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert 2
			expect(router.url).toBe('/test/child2');
			expect(fixture.debugElement.parent.query(By.directive(Child1Component))).toBeFalsy();
			expect(fixture.debugElement.parent.query(By.directive(Child2Component))).toBeTruthy();
			expect(dialogService.open).toHaveBeenCalledTimes(1); // Still 1, dialog not reopened
			expect(dialogRef.close).not.toHaveBeenCalled();
			expect(dialogRef.dismiss).not.toHaveBeenCalled();
		});

		it('should be able to inject parent service', async () => {
			// Arrange
			const addTestRouteWithParentDI = dialogRouteFactory(DialogRoutingTestWithParentDIComponent, {});

			const { router, fixture } = initTest({
				path: 'parent',
				component: ParentComponent,
				providers: [ProvidedInParentRouteService],
				children: [
					addTestRouteWithParentDI({
						path: 'test',
					}),
				],
			});

			// Act
			await router.navigateByUrl('/parent/test');
			fixture.detectChanges();
			await fixture.whenStable();

			const dialogComponent = fixture.debugElement.parent.query(By.directive(DialogRoutingTestWithParentDIComponent));

			// Assert
			expect(dialogService.open).toHaveBeenCalledTimes(1);
			expect(dialogComponent).toBeTruthy();
			expect(dialogComponent.componentInstance.parentService.value).toBe('provided-in-parent');
			expect(dialogComponent.componentInstance.routeService.value).toBe('provided-in-parent-route');
		});

		it('should handle nested dialogs', async () => {
			// Arrange
			const createParentDialogRoute = dialogRouteFactory(ParentComponent);
			const createNestedDialogRoute = dialogRouteFactory(DialogRoutingTestWithParentDIComponent);

			const { router, fixture } = initTest(
				createParentDialogRoute({
					path: 'dialog-parent',
					dialogRouteConfig: {
						providers: [ProvidedInParentRouteService],
						children: [createNestedDialogRoute({ path: 'dialog-nested' })],
					},
				}),
			);

			// Act
			await router.navigateByUrl('/dialog-parent/dialog-nested');
			fixture.detectChanges();
			await fixture.whenStable();

			const parentDialog = fixture.debugElement.parent.query(By.directive(ParentComponent));
			const nestedDialog = fixture.debugElement.parent.query(By.directive(DialogRoutingTestWithParentDIComponent));

			// Assert
			expect(openDialogs).toBe(2);
			expect(parentDialog).toBeTruthy();
			expect(nestedDialog).toBeTruthy();
		});

		it('should allow path param reading in dataFactory', async () => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: (route) => ({ foo: route.params['name'] }),
			});

			const { router, fixture } = initTest(route);

			// Act
			await router.navigateByUrl('/test/BAR');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			const dialogComponent = fixture.debugElement.parent.query(By.directive(DialogRoutingTestComponent));
			expect(dialogComponent).toBeTruthy();
			expect(dialogComponent.componentInstance.dialogData.foo).toBe('BAR');
		});

		function initTest(route: Route, features: RouterFeatures[] = []) {
			TestBed.configureTestingModule({
				imports: [AppTestComponent],
				providers: [provideRouter([route, { path: '', pathMatch: 'full', component: EmptyComponent }], ...features)],
			});

			return {
				router: TestBed.inject(Router),
				fixture: TestBed.createComponent(AppTestComponent),
			};
		}
	});
});

@Component({
	selector: 'lu-dialog-routing-empty',
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyComponent {}

@Component({
	selector: 'lu-dialog-routing-child1',
	template: `Child1`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Child1Component {}

@Component({
	selector: 'lu-dialog-routing-child2',
	template: `Child2`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Child2Component {}
