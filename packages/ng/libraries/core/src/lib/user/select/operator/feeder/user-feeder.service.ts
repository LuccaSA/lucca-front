import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../user.model';
import { of } from 'rxjs/observable/of';
// debug
const bob = { id: 12, firstName: 'spongebob', lastName: 'squarepants' } as IUser;
@Injectable()
export class LuUserFeederService<U extends IUser = IUser> {
	fields = 'id,firstname,lastname,picture[href]';
	apiUrl = '/api/v3/users/search';
	constructor(protected http: HttpClient) {}
	search(clue = '', page = 0): Observable<U[]> {
		const urlSafeClue = clue.split(' ').map(c => encodeURIComponent(c)).join(',');
		const filters = [this.fields];
		if (!!urlSafeClue) {
			filters.push(`clue=${urlSafeClue}`);
		}
		const url = `${this.apiUrl}?${filters.join('&')}`;
		return this.http.get<any>(url)
		.map(response => {
			return [bob as U];
		});
	}
}
