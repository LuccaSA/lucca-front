import { ChangeDetectionStrategy, Component, forwardRef, Input, TemplateRef, ContentChild } from '@angular/core';
import { ILuOptionOperator, ALuOptionOperator } from '../option-operator.model';
import { Observable } from 'rxjs/Observable';
import { ALuInputDisplayer, ILuInputDisplayer, LuInputDisplayerContext } from '../../../input/index';
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
		this.options$ = in$;
	}
	@Input() trackByFn: (option: T) => any;
	displayTemplate: TemplateRef<LuInputDisplayerContext<T>>;
	@ContentChild(ALuInputDisplayer, { read: TemplateRef }) set displayTemplates(tr: TemplateRef<LuInputDisplayerContext<T>>) {
		this.displayTemplate = tr; // exclude `this`
	}
	protected _displayer: ILuInputDisplayer<T>;
	@ContentChild(ALuInputDisplayer) set displayer(displayer: ILuInputDisplayer<T>) {
		this._displayer = displayer;
	}
}
