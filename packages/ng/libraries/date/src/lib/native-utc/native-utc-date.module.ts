import { NgModule } from '@angular/core';
import { ALuDateAdapter } from '../adapter/index';
import { LuNativeUTCDateAdapter } from './native-utc-date.adapter';

@NgModule({
	providers: [
		LuNativeUTCDateAdapter,
		{ provide: ALuDateAdapter, useClass: LuNativeUTCDateAdapter },
	]
})
export class LuNativeUTCDateModule {}
