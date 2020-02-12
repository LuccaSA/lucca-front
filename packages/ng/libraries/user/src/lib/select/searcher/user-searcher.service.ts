import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuUser } from '../../user.model';
import { ALuUserPagedSearcherService } from './user-searcher.model';
import { ILuApiPagedSearcherService } from '@lucca-front/ng/api';

@Injectable()
export class LuUserPagedSearcherService<U extends ILuUser = ILuUser>
extends ALuUserPagedSearcherService<U>
implements ILuApiPagedSearcherService<U> {
	constructor(protected http: HttpClient) { super(http); }
}
