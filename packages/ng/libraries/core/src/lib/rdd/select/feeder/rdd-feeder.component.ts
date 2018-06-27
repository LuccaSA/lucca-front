import {
	ChangeDetectionStrategy,
	Component,
	Input
} from '@angular/core';
import { ARDDSelectFeeder } from './rdd-feeder.model';
import { IRddItem } from '../../rdd.model';

@Component({
	selector: 'lu-rdd-feeder',
	template: '',
	exportAs: 'luRddFeeder',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RDDApiFeederComponent<T extends IRddItem> extends ARDDSelectFeeder<
	T
> {
	@Input() api: string;
	@Input() fields: string[];
	@Input() params: string[];
	getPagingStep() {
		return 20;
	}
	getApiUrl() {
		return this.api;
	}
	getFields() {
		return this.fields || ['id', 'name'];
	}
	getParams() {
		return this.params || [];
	}
	getClueField() {
		return 'name';
	}
}
