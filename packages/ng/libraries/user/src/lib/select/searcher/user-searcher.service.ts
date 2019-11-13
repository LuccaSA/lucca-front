import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuUser } from '../../user.model';
import { ALuUserPagedSearcherService } from './user-searcher.model';
import { ILuPagedSearcherService } from '@lucca-front/ng/core';

@Injectable()
export class LuUserPagedSearcherService<U extends ILuUser = ILuUser>
extends ALuUserPagedSearcherService<U>
implements ILuPagedSearcherService<U> {
	constructor(protected http: HttpClient) { super(http); }
}
