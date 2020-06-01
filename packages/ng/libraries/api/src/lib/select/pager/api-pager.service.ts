import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuApiItem } from '../../api.model';
import { ILuApiPagerService, ALuApiPagerService } from './api-pager.model';

@Injectable()
export class LuApiPagerService<T extends ILuApiItem = ILuApiItem> extends ALuApiPagerService<T> implements ILuApiPagerService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
