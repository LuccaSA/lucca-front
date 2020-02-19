import { NgModule } from '@angular/core';
import { ALuDateAdapter } from '../adapter/index';
import { LuNativelUTCDateAdapter } from './native-utc-date.adapter';

@NgModule({
	providers: [
		LuNativelUTCDateAdapter,
		{ provide: ALuDateAdapter, useClass: LuNativelUTCDateAdapter },
	]
})
export class LuNativeUTCDateModule {}
