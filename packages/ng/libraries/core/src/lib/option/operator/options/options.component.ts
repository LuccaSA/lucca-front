import { ChangeDetectionStrategy, Component, forwardRef, Input, ContentChild, TemplateRef } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { ALuInputDisplayer } from '../../../input/index';
@Component({
	selector: 'lu-options',
	templateUrl: 'options.component.html',
	styleUrls: ['options.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuOptionsComponent),
			multi: true,
		},
	],
})
export class LuOptionsComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T> {
	options$;
	set inOptions$(in$: Observable<T[]>) {
		this.options$ = in$
	}
	@Input() trackByFn: (option: T) => any;
	@ContentChild(ALuInputDisplayer, { read: TemplateRef }) displayTemplate;
}
