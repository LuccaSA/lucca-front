import { Component, Input } from '@angular/core';
import { ISelectApiFeeder, ASelectRDDApiFeeder } from './api-feeder.model';
import { IApiItem } from '../../../api';

@Component({
	moduleId: module.id,
	selector: 'lu-api-feeder',
	template: '',
	exportAs: 'luApiFeeder',
})
export class RDDApiFeederComponent<T extends IApiItem> extends ASelectRDDApiFeeder<T> implements ISelectApiFeeder<T> {
	@Input() api: string;
	@Input() fields: string[];
	@Input() params: string[];
	getPagingStep() { return 20; }
	getApiUrl() { return this.api; }
	getFields() { return this.fields ||  ['id', 'name']; }
	getParams() { return this.params || []; }
	getClueField() { return 'name'; }
}
