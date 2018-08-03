import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiItem } from '../../api.model';
import { ALuApiSearcherService, ALuApiPagedSearcherService } from './api-searcher.model';

@Injectable()
export class LuApiSearcherService<T extends IApiItem = IApiItem> extends ALuApiSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
@Injectable()
export class LuApiPagedSearcherService<T extends IApiItem = IApiItem> extends ALuApiPagedSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
