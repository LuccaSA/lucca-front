import { Directive, forwardRef, OnDestroy } from '@angular/core';

import { ILuTree } from '@lucca-front/ng/core';
import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { LuForOptionsDirective } from './for-options.directive';

@Directive({
	selector: '[luForTreeOptions]',
	standalone: true,
	providers: [
		{
			provide: ALuTreeOptionOperator,
			useExisting: forwardRef(() => LuForTreeOptionsDirective),
			multi: true,
		},
	],
})
export class LuForTreeOptionsDirective<T> extends LuForOptionsDirective<ILuTree<T>> implements ILuTreeOptionOperator<T>, OnDestroy {}
