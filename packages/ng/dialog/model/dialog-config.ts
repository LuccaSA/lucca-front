import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { AutoFocusTarget, DialogConfig } from '@angular/cdk/dialog';

const ɵdialogData = Symbol.for('luDialogData');
const ɵdialogResult = Symbol.for('luDialogResult');

export type ɵDialogDataFlag = { [ɵdialogData]: unknown };
export type ɵDialogResultFlag<R> = { [ɵdialogResult]: R };

export type LuDialogData<T> = {
	[K in keyof T]: T[K] extends ɵDialogDataFlag ? Omit<T[K], typeof ɵdialogData> : never;
}[keyof T];

type DialogRefProps<C> = { [K in keyof C]: C[K] extends ɵDialogResultFlag<unknown> ? K : never }[keyof C] & keyof C;
export type LuDialogResult<C> = DialogRefProps<C> extends never ? void : C[DialogRefProps<C>] extends ɵDialogResultFlag<infer T> ? T : void;

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
	modal?: boolean;

	/**
	 * Is this dialog a blocking popup that cannot be dismissed ?
	 *
	 * Defaults to false, setting this to true will also remove the close button in the header
	 * if you're using `lu-dialog-header`.
	 */
	alert?: boolean;

	/**
	 * Can be used if you don't have a header or aren't using the default one, to set an aria-label
	 * instead of aria-labelledby on the dialog container
	 */
	ariaLabel?: string;

	/**
	 * Autofocus target
	 *
	 * Defaults to the close button from the header, first-input is added by us to focus the first available input
	 * or the first input that is contained inside a node that has the `.luDialog-autofocus` class
	 */
	autoFocus?: AutoFocusTarget | 'first-input' | string;

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

	/**
	 * Determine if the current dialog can be close by a click on backdrop
	 */
	canCloseWithBackdrop?: boolean;

	/**
	 * The size of the panel used for the dialog
	 */
	size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'fitContent' | `maxContent` | 'fullScreen';

	/**
	 * Should it be a modal (default), a drawer? a drawer from bottom?
	 */
	mode?: 'default' | 'drawer' | 'drawer-from-bottom';

	/**
	 * Classes to add to the panel
	 */
	panelClasses?: string[];
}

export type LuDialogConfig<T> = LuDialogData<T> extends never ? Omit<BaseLuDialogConfig<T>, 'data'> : BaseLuDialogConfig<T>;
