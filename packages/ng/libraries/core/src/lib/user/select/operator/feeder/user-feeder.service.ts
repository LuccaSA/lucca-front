import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../user.model';

const MAGIC_PAGESIZE = 10;
// debug
const bob = { id: 12, firstName: 'spongebob', lastName: 'squarepants' } as IUser;
@Injectable()
export class LuUserFeederService<U extends IUser = IUser> {
	fields = 'id,firstname,lastname,picture[href]';
	apiUrl = '/api/v3/users/search';
	constructor(protected http: HttpClient) {}
	search(clue = '', page = 0): Observable<U[]> {
		const urlSafeClue = clue.split(' ').map(c => encodeURIComponent(c)).join(',');
		const filters = [
			`fields=${this.fields}`,
			// `paging=${page * MAGIC_PAGESIZE},${MAGIC_PAGESIZE}`,
			`paging=0,${(page + 1) * MAGIC_PAGESIZE}`,
			`dtcontractend=until,today,null`,
			'orderby=lastname,asc,firstname,asc',
		];

		if (!!urlSafeClue) {
			filters.push(`clue=${urlSafeClue}`);
		}
		const url = `${this.apiUrl}?${filters.join('&')}`;
		return this.http.get<{data: {items: {item: U}[] }}>(url)
		.map(response => {
			return response.data.items.map(i => i.item);
		});
	}
}
