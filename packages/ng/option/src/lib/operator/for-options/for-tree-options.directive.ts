import { Directive, forwardRef, OnDestroy } from '@angular/core';

import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '@lucca-front/ng/core';
import { LuForOptionsDirective } from './for-options.directive';

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
