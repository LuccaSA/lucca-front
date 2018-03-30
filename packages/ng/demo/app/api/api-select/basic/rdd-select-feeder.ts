import { ASelectRDDFeeder } from '../../../../../src/app/rdd';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoApiSelectFeeder extends ASelectRDDFeeder<any> {

	apiUrl: string;
	fields: string[];

	getPagingStep(): number {
		return 20;
	}
	getApiUrl(): string {
		return '/api/v3/users';
	}
	getFields(): string[] {
		return ['id', 'lastname', 'firstname', 'name'];
	}
	getParams(): string[] {
		return [];
	}
	getClueField(): string {
		return 'name';
	}
}
