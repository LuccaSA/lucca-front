import { ComponentType } from '@angular/cdk/overlay';
import { inject } from '@angular/core';
import { CanActivate, CanDeactivateFn, DeprecatedGuard, Route } from '@angular/router';
import { firstValueFrom, from, isObservable, Observable, of } from 'rxjs';
import { LuDialogData } from '../model';
import { DialogRoutingContainerComponent } from './dialog-routing.component';
import { DialogRouteConfig, DialogRouteData, DialogRouteDialogConfig } from './dialog-routing.models';

export type Deferrable<T> = Promise<T> | Observable<T> | T;
export type DialogResolveFn<T> = () => Deferrable<T>;

export async function deferrableToPromise<T>(deferrable: Promise<T> | Observable<T> | T): Promise<T> {
	return isObservable(deferrable) ? firstValueFrom(deferrable) : deferrable;
}

export function deferrableToObservable<T>(deferrable: Promise<T> | Observable<T> | T): Observable<T> {
	return isObservable(deferrable) ? deferrable : deferrable instanceof Promise ? from(deferrable) : of(deferrable);
}

export function createDialogRoute<C>(dialogRouteConfig: DialogRouteConfig<C>): Route {
	const { dialogConfigFactory, dataFactory, canMatch, ...baseRoute } = dialogRouteConfig;

	const data: DialogRouteData<C> = { dialogRouteConfig };

	return {
		path: dialogRouteConfig.path,
		component: DialogRoutingContainerComponent,
		data,
		canMatch,
		children: [
			{
				...baseRoute,
				path: '',
				canDeactivate: dialogRouteConfig.canDeactivate
					?.map((fn) => toCanDeactivateFn(fn))
					?.map(
						(guard): CanDeactivateFn<C> =>
							(dialogComponentInstance, route, state, nextState) => {
								// If dialogComponentInstance is null, it means the dialog is already closed. We allow deactivation in this case.
								if (!dialogComponentInstance) {
									return true;
								}

								return guard(dialogComponentInstance, route, state, nextState);
							},
					),
			},
		],
	};
}

export type DialogFactoryResultOptions<C> = {
	path: string;
	dialogRouteConfig?: Partial<Omit<DialogRouteConfig<C>, 'path' | 'component' | 'loadComponent' | 'dataFactory'>>;
} & (LuDialogData<C> extends never
	? { dataFactory?: never }
	: {
			dataFactory: DialogResolveFn<LuDialogData<C>>;
		});

export type DialogFactoryResult<C> = (options: DialogFactoryResultOptions<C>) => Route;

export type DialogFactoryConfig<C> = Partial<{
	dialogConfig: DialogRouteDialogConfig<C>;
	dialogRouteConfig: Partial<DialogRouteConfig<C>>;
}>;

export function dialogRouteFactory<C>(component: ComponentType<C>, config?: DialogFactoryConfig<C>): DialogFactoryResult<C> {
	return ({ path, dataFactory, dialogRouteConfig }) =>
		createDialogRoute<C>({
			path,
			component,
			dataFactory: dataFactory as LuDialogData<C> extends never ? undefined : DialogResolveFn<LuDialogData<C>>,
			dialogConfigFactory: () => config?.dialogConfig ?? ({} as DialogRouteDialogConfig<C>),
			...mergeRouteConfig(config?.dialogRouteConfig, dialogRouteConfig),
		});
}

export function dialogLazyRouteFactory<C>(loadComponent: () => Promise<ComponentType<C>>, config?: DialogFactoryConfig<C>): DialogFactoryResult<C> {
	return ({ path, dataFactory, dialogRouteConfig }) =>
		createDialogRoute<C>({
			path,
			loadComponent,
			dataFactory: dataFactory as LuDialogData<C> extends never ? undefined : DialogResolveFn<LuDialogData<C>>,
			dialogConfigFactory: () => config?.dialogConfig ?? ({} as DialogRouteDialogConfig<C>),
			...mergeRouteConfig(config?.dialogRouteConfig, dialogRouteConfig),
		});
}

function mergeRouteConfig<C>(config1: Partial<DialogRouteConfig<C>>, config2: Partial<DialogRouteConfig<C>>): Partial<DialogRouteConfig<C>> {
	if (!config1) {
		return config2;
	}

	if (!config2) {
		return config1;
	}

	const result: Partial<DialogRouteConfig<C>> = { ...config1, ...config2 };

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

	// If both configs have the same resolve key, we merge the objects
	if (config1.resolve && config2.resolve) {
		result.resolve = { ...config1.resolve, ...config2.resolve };
	}

	return result;
}

export function toCanDeactivateFn<C>(guard: DeprecatedGuard | CanDeactivateFn<C>): CanDeactivateFn<C> {
	if (typeof guard === 'string') {
		throw new Error('String guards are not supported in dialog routes');
	}

	try {
		const deprectedGuard = inject(guard) as CanActivate;
		return (_component, currentRoute, _currentState, nextState) => deprectedGuard.canActivate(currentRoute, nextState);
	} catch {
		return guard as CanDeactivateFn<C>;
	}
}
