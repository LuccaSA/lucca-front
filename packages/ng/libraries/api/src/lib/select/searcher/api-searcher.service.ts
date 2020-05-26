import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuApiItem } from '../../api.model';
import { ALuApiSearcherService, ALuApiPagedSearcherService } from './api-searcher.model';

@Injectable()
export class LuApiSearcherService<T extends ILuApiItem = ILuApiItem> extends ALuApiSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
@Injectable()
export class LuApiPagedSearcherService<T extends ILuApiItem = ILuApiItem> extends ALuApiPagedSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
