import { NgModule } from '@angular/core';
import { ALuDateAdapter } from '@lucca-front/ng/core';
import { LuNativeUTCDateAdapter } from './native-utc-date.adapter';

@NgModule({
	providers: [
		LuNativeUTCDateAdapter,
		{ provide: ALuDateAdapter, useClass: LuNativeUTCDateAdapter },
	]
})
export class LuNativeUTCDateModule {}
