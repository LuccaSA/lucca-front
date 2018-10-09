import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user.model';
import { ALuUserPagedSearcherService } from './user-searcher.model';
import { ILuApiPagedSearcherService } from '../../../api/index';

@Injectable()
export class LuUserPagedSearcherService<U extends IUser = IUser>
extends ALuUserPagedSearcherService<U>
implements ILuApiPagedSearcherService<U> {
	constructor(protected http: HttpClient) { super(http); }
}
