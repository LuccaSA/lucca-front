import { ComponentType } from '@angular/cdk/overlay';
import { CanDeactivateFn, defaultUrlMatcher, Route } from '@angular/router';
import { firstValueFrom, from, isObservable, Observable, of } from 'rxjs';
import { LuDialogConfig, LuDialogData } from '../model';
import { DialogRoutingContainerComponent } from './dialog-routing.component';
import { DialogRouteConfig, DialogRouteResolveConfig, DialogRouteStaticData } from './dialog-routing.models';

export type Deferrable<T> = Promise<T> | Observable<T> | T;

export async function deferrableToPromise<T>(deferrable: Promise<T> | Observable<T> | T): Promise<T> {
	return isObservable(deferrable) ? firstValueFrom(deferrable) : deferrable;
}

export function deferrableToObservable<T>(deferrable: Promise<T> | Observable<T> | T): Observable<T> {
	return isObservable(deferrable) ? deferrable : deferrable instanceof Promise ? from(deferrable) : of(deferrable);
}

export function createDialogRoute<C>(dialogRouteConfig: DialogRouteConfig<C>): Route {
	const data: DialogRouteStaticData<C> = { dialogRouteConfig };
	const resolve: DialogRouteResolveConfig<C> = {
		dialogConfig: () => dialogRouteConfig.dialogConfigFactory(),
		dialogData: () => dialogRouteConfig.dataFactory?.(),
	};

	return {
		// Check that child route matches without consuming any URL segments
		matcher: (segments, group, route) => {
			const result = defaultUrlMatcher(segments, group, { path: dialogRouteConfig.path });
			return result
				? {
						consumed: [],
						posParams: result.posParams,
					}
				: null;
		},
		component: DialogRoutingContainerComponent,
		resolve,
		data,
		children: [
			{
				...dialogRouteConfig,
				canDeactivate: dialogRouteConfig.canDeactivate?.map((guard) => (dialogComponentInstance, route, state, nextState) => {
					// If dialogComponentInstance is null, it means the dialog is already closed. We allow deactivation in this case.
					if (!dialogComponentInstance) {
						return true;
					}

					// Do not support DeprecatedGuard here
					return (guard as CanDeactivateFn<C>)(dialogComponentInstance, route, state, nextState);
				}),
			},
		],
	};
}

export type DialogFactoryResultOptions<C> = {
	path: string;
	dialogRouteConfig?: Partial<Omit<DialogRouteConfig<C>, 'path' | 'component' | 'dataFactory'>>;
} & (LuDialogData<C> extends never
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
			component,
			dataFactory,
			dialogConfigFactory: () => config?.dialogConfig ?? {},
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

	// If both configs have the same resolve key, we merge the objects
	if (config1.resolve && config2.resolve) {
		result.resolve = { ...config1.resolve, ...config2.resolve };
	}

	return result;
}
