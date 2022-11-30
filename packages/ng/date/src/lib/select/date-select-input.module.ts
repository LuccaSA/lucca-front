import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LuInputClearerModule, LuInputDisplayerModule, LuInputModule } from '@lucca-front/ng/input';
import { LuDateAdapterModule } from '../adapter/index';
import { LuDatePickerModule } from '../picker/index';
import { LuDateSelectInputComponent } from './date-select-input.component';

@NgModule({
	imports: [LuDateAdapterModule, LuDatePickerModule, LuInputModule, OverlayModule, LuInputClearerModule, LuInputDisplayerModule],
	exports: [LuDateSelectInputComponent],
	declarations: [LuDateSelectInputComponent],
})
export class LuDateSelectInputModule {}
