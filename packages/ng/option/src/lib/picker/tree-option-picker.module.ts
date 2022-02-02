import { NgModule } from '@angular/core';
import { LuTreeOptionPickerComponent } from './tree-option-picker.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuScrollModule } from '@lucca-front/ng/scroll';
import { A11yModule } from '@angular/cdk/a11y';
import { LuTreeOptionPickerAdvancedComponent } from './tree-option-picker-advanced.component';

@NgModule({
	imports: [CommonModule, OverlayModule, LuScrollModule, A11yModule],
	declarations: [LuTreeOptionPickerComponent, LuTreeOptionPickerAdvancedComponent],
	exports: [LuTreeOptionPickerComponent, LuTreeOptionPickerAdvancedComponent],
})
export class LuTreeOptionPickerModule {}
