import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiItem } from '../../api.model';
import { ILuApiPagerService, ALuApiPagerService } from './api-pager.model';

@Injectable()
export class LuApiPagerService<T extends IApiItem = IApiItem> extends ALuApiPagerService<T> implements ILuApiPagerService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
