import { NgModule } from '@angular/core';
import { LuDateSelectInputComponent } from './date-select-input.component';
import { LuDateAdapterModule } from '../adapter/index';
import { LuDatePickerModule } from '../picker/index';
import { LuInputModule, LuInputClearerModule, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	imports: [
		LuDateAdapterModule,
		LuDatePickerModule,
		LuInputModule,
		OverlayModule,
		LuInputClearerModule,
		LuInputDisplayerModule,
	],
	exports: [
		LuDateSelectInputComponent,
	],
	declarations: [
		LuDateSelectInputComponent,
	],
})
export class LuDateSelectInputModule {}
