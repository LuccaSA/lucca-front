import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogConfig } from '@angular/cdk/dialog';

export const dialogData = Symbol.for('luDialogData');
export const dialogResult = Symbol.for('luDialogResult');

export type LuDialogData<T> = {
	[K in keyof T]: T[K] extends { [dialogData]: infer D } ? D : never;
}[keyof T];

export type LuDialogResult<C> = {
	[K in keyof C]: C[K] extends { [dialogResult]: infer R } ? R : never;
}[keyof C];

interface BaseLuDialogConfig<C> {
	component: ComponentType<C> | TemplateRef<C>;
	data: LuDialogData<C>;

	backdrop?: boolean;
	dismissible?: boolean;
	ariaLabel?: string;
	cdkConfigOverride?: DialogConfig<C>;
	canClose?: (comp: C) => boolean | Observable<boolean>;
}

export type LuDialogConfig<T> = LuDialogData<T> extends never ? Omit<BaseLuDialogConfig<T>, 'data'> : BaseLuDialogConfig<T>;
