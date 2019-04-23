import { NgModule } from '@angular/core';
import { LuOptionPickerComponent } from './option-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionItemModule } from '../item/index';
import { LuScrollModule } from '../../scroll/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuOptionItemModule,
		LuScrollModule,
		A11yModule,
	],
	declarations: [
		LuOptionPickerComponent,
	],
	exports: [
		LuOptionPickerComponent,
	],
})
export class LuOptionPickerModule {}
