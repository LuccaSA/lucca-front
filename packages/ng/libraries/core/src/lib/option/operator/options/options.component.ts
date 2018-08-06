import { ChangeDetectionStrategy, Component, forwardRef, Input, TemplateRef, ContentChildren, QueryList, ElementRef, ViewRef, EmbeddedViewRef } from '@angular/core';
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
		{
			provide: ALuInputDisplayer,
			useExisting: forwardRef(() => LuOptionsComponent),
			multi: true,
		},
	],
})
export class LuOptionsComponent<T = any> extends ALuOptionOperator<T> implements ILuOptionOperator<T>, ILuInputDisplayer<T> {
	options$;
	set inOptions$(in$: Observable<T[]>) {
		this.options$ = in$
	}
	@Input() trackByFn: (option: T) => any;
	displayTemplate: TemplateRef<LuInputDisplayerContext<T>>;
	@ContentChildren(ALuInputDisplayer, { read: TemplateRef }) set displayTemplates(ql: QueryList<TemplateRef<LuInputDisplayerContext<T>>>) {
		this.displayTemplate = ql.toArray()[1]; // exclude `this`
	}
	protected _displayer: ILuInputDisplayer<T>;
	@ContentChildren(ALuInputDisplayer) set displayers(ql: QueryList<ILuInputDisplayer<T>>) {
		this._displayer = ql.toArray()[1];
	}
	getElementRef(value): ElementRef {
		if (!!this._displayer) {
			return this._displayer.getElementRef(value);
		}
		return undefined;
	}
	getViewRef(value): ViewRef {
		if (!!this._displayer) {
			return this._displayer.getViewRef(value);
		}
		return undefined;
	}
}
