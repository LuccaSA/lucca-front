import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ILuOptionItem } from '../../item/index';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'lu-option-template',
	templateUrl: './option-template.component.html',
	styleUrls: ['./option-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionTemplateComponent),
			multi: true,
		},
	],
})
export class LuOptionTemplateComponent<T = any> implements ILuOptionOperator<T> {
	inOptions$: Observable<ILuOptionItem<T>[]>;
}
