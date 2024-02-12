import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogConfig } from '@angular/cdk/dialog';

export const dialogData = Symbol.for('luDialogData');
export const dialogResult = Symbol.for('luDialogResult');

export type LuDialogData<T> = {
	[K in keyof T]: T[K] extends { [dialogData]: infer D } ? D : never;
}[keyof T];

export type LuDialogResult<C> = keyof C extends never
	? void
	: {
			[K in keyof C]: C[K] extends { [dialogResult]: infer R } ? R : void;
	  }[keyof C];

interface BaseLuDialogConfig<C> {
	/**
	 * The component or template to put inside the dialog container
	 */
	content: ComponentType<C> | TemplateRef<C>;

	/**
	 * Data to pass to the component, will be required if the component used `injectDialogData` in a field, specifying the data that's needed.
	 */
	data: LuDialogData<C>;

	/**
	 * Should we put a backdrop? Defaults to true
	 */
	backdrop?: boolean;

	/**
	 * Can this dialog box be dismissed by clicking on the backdrop or pressing escape?
	 *
	 * Defaults to true, setting this to false will also remove the close button in the header
	 * if you're using `lu-dialog-header`.
	 */
	dismissible?: boolean;

	/**
	 * Can be used if you don't have a header or aren't using the default one, to set an aria-label
	 * instead of aria-labelledby on the dialog container
	 */
	ariaLabel?: string;

	/**
	 * This provides a way to override any of the configuration parameters expected by cdk's `Dialog.open` method.
	 *
	 * WARNING: this will take full authority and override with your values no matter what's computed by LuDialogService,
	 * use with caution.
	 */
	cdkConfigOverride?: DialogConfig<C>;

	/**
	 * A hook function to determine if the current dialog can be closed or not, if provided.
	 *
	 * @param comp the instance of the component that's inside the dialog box.
	 */
	canClose?: (comp: C) => boolean | Observable<boolean>;
}

export type LuDialogConfig<T> = LuDialogData<T> extends never ? Omit<BaseLuDialogConfig<T>, 'data'> : BaseLuDialogConfig<T>;
