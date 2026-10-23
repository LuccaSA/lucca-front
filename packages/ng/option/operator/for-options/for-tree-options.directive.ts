import { Directive, forwardRef, OnDestroy } from '@angular/core';

import { ILuTree } from '@lucca-front/ng/core';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { LuForOptionsDirective } from './for-options.directive';
/**
 * @deprecated since 20.2.0; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent.
 * @see https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated
 */
@Directive({
	selector: '[luForTreeOptions]',
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuForTreeOptionsDirective),
			multi: true,
		},
	],
})
export class LuForTreeOptionsDirective<T> extends LuForOptionsDirective<ILuTree<T>> implements ILuTreeOptionOperator<T>, OnDestroy {}
