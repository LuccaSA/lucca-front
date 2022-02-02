import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuScrollModule } from '@lucca-front/ng/scroll';
import { LuOptionItemModule } from '../item/index';
import { LuOptionPickerAdvancedComponent } from './option-picker-advanced.component';
import { LuOptionPickerComponent } from './option-picker.component';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuOptionItemModule,
		LuScrollModule,
		A11yModule,
	],
	declarations: [LuOptionPickerComponent, LuOptionPickerAdvancedComponent],
	exports: [
		LuOptionPickerComponent,
		LuOptionPickerAdvancedComponent,
		LuOptionItemModule,
	],
})
export class LuOptionPickerModule {}
