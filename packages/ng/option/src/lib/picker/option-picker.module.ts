import { NgModule } from '@angular/core';
import { LuOptionItemComponent } from '../item/index';
import { LuOptionPickerAdvancedComponent } from './option-picker-advanced.component';
import { LuOptionPickerComponent } from './option-picker.component';

@NgModule({
	imports: [LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent],
	exports: [LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent],
})
export class LuOptionPickerModule {}
