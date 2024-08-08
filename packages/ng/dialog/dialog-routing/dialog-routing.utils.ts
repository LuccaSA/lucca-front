import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { DialogRoutingComponent } from './dialog-routing.component';
import { DialogRouteConfig } from './dialog-routing.models';
import { LuDialogConfig, LuDialogData } from '../model';
import { ComponentType } from '@angular/cdk/portal';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

export type Deferrable<T> = Promise<T> | Observable<T> | T;

export async function deferrableToPromise<T>(deferrable: Promise<T> | Observable<T> | T): Promise<T> {
	return isObservable(deferrable) ? firstValueFrom(deferrable) : deferrable;
}

export const DIALOG_ROUTE_CONFIG = new InjectionToken<DialogRouteConfig<unknown>>('DIALOG_ROUTE_CONFIG');

export function createDialogRoute<C>(config: DialogRouteConfig<C>): Route {
	return {
		path: config.path,
		component: DialogRoutingComponent,
		providers: [{ provide: DIALOG_ROUTE_CONFIG, useValue: config }, ...[config.providers ?? []]],
	};
}

export type DialogFactoryResult<C> = (
	options: LuDialogData<C> extends never
		? { path: string; dialogRouteConfig?: Partial<DialogRouteConfig<C>> }
		: {
				path: string;
				dataFactory: () => Deferrable<LuDialogData<C>>;
				dialogRouteConfig?: Partial<DialogRouteConfig<C>>;
			},
) => Route;

export type DialogFactoryConfig<C> = Partial<{
	dialogConfig: Omit<LuDialogConfig<C>, 'data' | 'content'>;
	dialogRouteConfig: Partial<DialogRouteConfig<C>>;
}>;

export function dialogRouteFactory<C>(component: ComponentType<C>, config?: DialogFactoryConfig<C>): DialogFactoryResult<C> {
	return ({ path, dataFactory, dialogRouteConfig }: { path: string; dataFactory?: () => Deferrable<LuDialogData<C>>; dialogRouteConfig?: Partial<DialogRouteConfig<C>> }) =>
		createDialogRoute({
			path,
			dialogConfigFactory: async () => ({
				...config?.dialogConfig,
				content: component,
				data: dataFactory ? await deferrableToPromise(dataFactory()) : undefined,
			}),
			...config?.dialogRouteConfig,
			...dialogRouteConfig,
		});
}
