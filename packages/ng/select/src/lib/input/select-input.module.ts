import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';

@NgModule({
	imports: [CommonModule, OverlayModule],
	declarations: [LuSelectInputComponent],
	exports: [LuSelectInputComponent],
})
export class LuSelectInputModule {}
