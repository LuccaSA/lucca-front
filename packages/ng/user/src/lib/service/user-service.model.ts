import { ILuUser } from '../user.model';
import { ILuApiService, ALuApiService } from '@lucca-front/ng/api';
import { Observable } from 'rxjs';

export interface ILuUserService<U extends ILuUser = ILuUser>
	extends ILuApiService<U> {
	getMe(): Observable<U>;
}

export abstract class ALuUserService<U extends ILuUser = ILuUser>
	extends ALuApiService<U>
	implements ILuUserService<U>
{
	abstract getMe(): Observable<U>;
}
