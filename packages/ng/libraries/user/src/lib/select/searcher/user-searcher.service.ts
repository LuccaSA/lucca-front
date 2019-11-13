import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuUser } from '../../user.model';
import { ALuUserService } from './user-searcher.model';
import { ILuService } from '@lucca-front/ng/core';

@Injectable()
export class LuUserService<U extends ILuUser = ILuUser>
extends ALuUserService<U>
implements ILuService<U> {
	constructor(_http: HttpClient) { super(_http); }
}
