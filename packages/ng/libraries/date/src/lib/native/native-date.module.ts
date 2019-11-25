import { NgModule } from '@angular/core';
import { ALuDateAdapter } from '../adapter';
import { LuNativeDateAdapter } from './native-date.adapter';

@NgModule({
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class LuNativeDateAdapterModule {}
