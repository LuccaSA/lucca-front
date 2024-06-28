/* tslint:disable */
/* eslint-disable */

import { injectDialogData, LuDialogRef } from '../model';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Route, Router, RouterOutlet } from '@angular/router';

import { EMPTY, Observable, Subject } from 'rxjs';

const dialogOpen = jest.fn();
jest.mock('../dialog.providers', () => {
	const { LuDialogService } = jest.requireActual('../dialog.service');
	return {
		provideLuDialog: () => ({
			provide: LuDialogService,
			useValue: { open: dialogOpen },
		}),
	};
});

import { dialogRouteFactory } from './dialog-routing.utils';

interface DialogRoutingTestDialogData {
	foo: string;
}

@Component({
	selector: 'pr-dialog-routing-test',
	standalone: true,
	template: '',
})
class DialogRoutingTestComponent {
	dialogData = injectDialogData<DialogRoutingTestDialogData>();
}

@Component({
	selector: 'pr-app-test',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />',
})
class AppTestComponent {}

describe('dialog-routing.utils', () => {
	beforeEach(() => {
		dialogOpen.mockReset();
		dialogOpen.mockImplementation(
			() =>
				({
					dismissed$: EMPTY as Observable<void>,
					result$: EMPTY as Observable<void>,
				}) as LuDialogRef<void>,
		);
	});

	describe('dialogRouteFactory', () => {
		const addTestRoute = dialogRouteFactory(DialogRoutingTestComponent);

		it('should work with synchronous data', fakeAsync(() => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => ({ foo: 'bar' }),
			});

			const { router, fixture } = initTest(route);

			// Act
			router.navigateByUrl('/test/bar');
			tick();
			fixture.detectChanges();
			tick();

			// Assert
			expect(dialogOpen).toHaveBeenCalledTimes(1);
			expect(dialogOpen).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'bar' },
				}),
			);
		}));

		it('should work with Promise data', fakeAsync(() => {
			// Arrange
			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => Promise.resolve({ foo: 'baz' }),
			});

			const { router, fixture } = initTest(route);

			// Act
			router.navigateByUrl('/test/baz');
			tick();
			fixture.detectChanges();
			tick();

			// Assert
			expect(dialogOpen).toHaveBeenCalledTimes(1);
			expect(dialogOpen).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'baz' },
				}),
			);
		}));

		it('should work with observable data', fakeAsync(() => {
			// Arrange
			const data$ = new Subject<{ foo: string }>();

			const route = addTestRoute({
				path: 'test/:name',
				dataFactory: () => data$,
			});

			const { router, fixture } = initTest(route);

			// Act
			router.navigateByUrl('/test/bar');
			tick();
			fixture.detectChanges();
			data$.next({ foo: 'bar' });
			tick();

			// Assert
			expect(dialogOpen).toHaveBeenCalledTimes(1);
			expect(dialogOpen).toHaveBeenCalledWith(
				expect.objectContaining({
					data: { foo: 'bar' },
				}),
			);
		}));

		function initTest(route: Route) {
			TestBed.configureTestingModule({
				imports: [AppTestComponent],
				providers: [provideRouter([route])],
			});

			return {
				router: TestBed.inject(Router),
				fixture: TestBed.createComponent(AppTestComponent),
			};
		}
	});
});
