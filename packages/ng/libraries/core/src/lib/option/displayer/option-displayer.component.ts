import { ChangeDetectionStrategy, Component, TemplateRef, forwardRef, ContentChild } from '@angular/core';
import { ALuInputDisplayer, ILuInputDisplayer } from '../../input/index';

@Component({
	selector: 'lu-option-displayer',
	templateUrl: './option-displayer.component.html',
	styleUrls: ['./option-displayer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: ALuInputDisplayer,
			useExisting: forwardRef(() => LuOptionDisplayerComponent),
			multi: true,
		},
	],
})
export class LuOptionDisplayerComponent<T = any> extends ALuInputDisplayer<T> implements ILuInputDisplayer<T> {
	protected _template: TemplateRef<any>;
	@ContentChild(TemplateRef) set template(t: TemplateRef<any>) {
		this._template = t;
	}
	getViewRef(value: T) {
		if (!this._template) { return undefined; }
		return this._template.createEmbeddedView({ $implicit: value });
	}
}
