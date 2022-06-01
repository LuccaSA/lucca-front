import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuSelectPanelModule } from '../panel/panel.module';
import { LuSelectInput2Component } from './select-input.component';

@NgModule({
	imports: [CommonModule, LuSelectPanelModule, OverlayModule],
	declarations: [LuSelectInput2Component],
	exports: [LuSelectInput2Component],
})
export class LuSelectInput2Module {}
