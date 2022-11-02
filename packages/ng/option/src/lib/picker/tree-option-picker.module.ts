import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuScrollDirective } from '@lucca-front/ng/scroll';
import { LuTreeOptionPickerAdvancedComponent } from './tree-option-picker-advanced.component';
import { LuTreeOptionPickerComponent } from './tree-option-picker.component';

@NgModule({
	imports: [CommonModule, OverlayModule, LuScrollDirective, A11yModule, LuTreeOptionPickerAdvancedComponent, LuTreeOptionPickerComponent],
	exports: [LuTreeOptionPickerComponent, LuTreeOptionPickerAdvancedComponent],
})
export class LuTreeOptionPickerModule {}
