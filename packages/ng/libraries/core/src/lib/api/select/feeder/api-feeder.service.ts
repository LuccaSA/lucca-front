import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApiItem } from '../../api.model';
import { ILuApiFeederService, ALuApiFeederService } from './api-feeder.model';

@Injectable()
export class LuApiFeederService<T extends IApiItem> extends ALuApiFeederService<T> implements ILuApiFeederService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
