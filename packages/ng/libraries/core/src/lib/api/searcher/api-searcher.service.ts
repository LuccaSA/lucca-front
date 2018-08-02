import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiItem } from '../api.model';
import { ALuApiSearcherService } from './api-searcher.model';

@Injectable()
export class LuApiSearcherService<T extends IApiItem = IApiItem> extends ALuApiSearcherService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
