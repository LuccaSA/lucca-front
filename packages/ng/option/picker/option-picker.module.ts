import { NgModule } from '@angular/core';
import { LuOptionItemComponent } from '../item/index';
import { LuOptionPickerAdvancedComponent } from './option-picker-advanced.component';
import { LuOptionPickerComponent } from './option-picker.component';

/**
 * @deprecated use `LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent` instead
 */
@NgModule({
	imports: [LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent],
	exports: [LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent],
})
export class LuOptionPickerModule {}
