import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, firstValueFrom, from, isObservable, of } from 'rxjs';
import { LuDialogConfig, LuDialogData } from '../model';
import { DialogRoutingComponent } from './dialog-routing.component';
import { DialogRouteConfig } from './dialog-routing.models';

export type Deferrable<T> = Promise<T> | Observable<T> | T;

export async function deferrableToPromise<T>(deferrable: Promise<T> | Observable<T> | T): Promise<T> {
	return isObservable(deferrable) ? firstValueFrom(deferrable) : deferrable;
}

export function deferrableToObservable<T>(deferrable: Promise<T> | Observable<T> | T): Observable<T> {
	return isObservable(deferrable) ? deferrable : deferrable instanceof Promise ? from(deferrable) : of(deferrable);
}

export const DIALOG_ROUTE_CONFIG = new InjectionToken<DialogRouteConfig<unknown>>('DIALOG_ROUTE_CONFIG');

export function createDialogRoute<C>(config: DialogRouteConfig<C>): Route {
	// Remove `canDeactivate` from the route config and handle it in the dialog component
	const { canDeactivate, ...rest } = config;
	return {
		...rest,
		component: DialogRoutingComponent,
		providers: [{ provide: DIALOG_ROUTE_CONFIG, useValue: config }, ...(config.providers ?? [])],
	};
}

export type DialogFactoryResultOptions<C> = { path: string; dialogRouteConfig?: Partial<Omit<DialogRouteConfig<C>, 'path'>> } & (LuDialogData<C> extends never
	? { dataFactory?: never }
	: {
			dataFactory: () => Deferrable<LuDialogData<C>>;
		});

export type DialogFactoryResult<C> = (options: DialogFactoryResultOptions<C>) => Route;

export type DialogFactoryConfig<C> = Partial<{
	dialogConfig: Omit<LuDialogConfig<C>, 'data' | 'content'>;
	dialogRouteConfig: Partial<DialogRouteConfig<C>>;
}>;

export function dialogRouteFactory<C>(component: ComponentType<C>, config?: DialogFactoryConfig<C>): DialogFactoryResult<C> {
	return ({ path, dataFactory, dialogRouteConfig }) =>
		createDialogRoute({
			path,
			dialogConfigFactory: async () => ({
				...config?.dialogConfig,
				content: component,
				data: dataFactory ? await deferrableToPromise(dataFactory()) : undefined,
			}),
			...mergeRouteConfig(config?.dialogRouteConfig, dialogRouteConfig),
		});
}

function mergeRouteConfig(config1: Partial<Route>, config2: Partial<Route>): Partial<Route> {
	if (!config1) {
		return config2;
	}

	if (!config2) {
		return config1;
	}

	const result: Partial<Route> = { ...config1, ...config2 };

	// If both configs have the same key, we merge the arrays
	const mergedArrays = (['providers', 'canActivate', 'children', 'canDeactivate', 'canLoad', 'canActivateChild'] as const satisfies Array<keyof Route>).filter(
		(key) => key in config1 && key in config2,
	);

	for (const key of mergedArrays) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		result[key] = [...(config1[key] ?? []), ...(config2[key] ?? [])] as any[];
	}

	// If both configs have the same data key, we merge the objects
	if (config1.data && config2.data) {
		result.data = { ...config1.data, ...config2.data };
	}

	return result;
}
