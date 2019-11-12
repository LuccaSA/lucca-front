
import { Directive, forwardRef, OnDestroy } from '@angular/core';

import { ALuTreeOptionOperator, ILuTreeOptionOperator } from '../tree-option-operator.model';
import { ILuTree } from '../../../tree.model';
import { LuForOptionsDirective } from '../../../../option/index';

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
export class LuForTreeOptionsDirective<T> extends LuForOptionsDirective<ILuTree<T>> implements ILuTreeOptionOperator<T>, OnDestroy {

}
