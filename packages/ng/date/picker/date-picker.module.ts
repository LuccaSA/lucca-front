import { NgModule } from '@angular/core';
import { LuDatePickerComponent } from './date-picker.component';

/**
 * @deprecated use `LuDatePickerComponent` instead
 */
@NgModule({
	imports: [LuDatePickerComponent],
	exports: [LuDatePickerComponent],
})
export class LuDatePickerModule {}
