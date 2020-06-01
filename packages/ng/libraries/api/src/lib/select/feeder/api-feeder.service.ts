import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuApiItem } from '../../api.model';
import { ILuApiFeederService, ALuApiFeederService } from './api-feeder.model';

@Injectable()
export class LuApiFeederService<T extends ILuApiItem = ILuApiItem> extends ALuApiFeederService<T> implements ILuApiFeederService<T> {
	constructor(protected http: HttpClient) { super(http); }
}
