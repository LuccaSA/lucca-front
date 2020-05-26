import { NgModule } from '@angular/core';
import { ALuDateAdapter } from '@lucca-front/ng/core';
import { LuNativeDateAdapter } from './native-date.adapter';

@NgModule({
	providers: [
		LuNativeDateAdapter,
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class LuNativeDateModule {}
