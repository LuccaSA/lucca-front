import { ALuApiPagedSearcherService, ILuApiPagedSearcherService, ISuggestion } from '../../../api/index';
import { IUser } from '../../user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class ALuUserPagedSearcherService<U extends IUser = IUser>
extends ALuApiPagedSearcherService<U>
implements ILuApiPagedSearcherService<U> {
	constructor(protected http: HttpClient) {
		super(http);
		this.api = '/api/v3/users/search';
		this.fields = 'id,firstname,lastname,picture[href]';
		this.orderBy = 'lastname,asc,firstname,asc';
	}
	protected _get(url) {
		return (<any>super._get(url) as Observable<ISuggestion<U>[]>)
		.pipe(map(suggestions => suggestions.map(s => s.item)));
	}
	protected _clueFilter(clue) {
		const urlSafeClue = clue.split(' ').map(c => encodeURIComponent(c)).join(',');
		return `clue=${urlSafeClue}`;
	}
}
