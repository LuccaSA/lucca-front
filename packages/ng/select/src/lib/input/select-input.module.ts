import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	imports: [CommonModule, OverlayModule],
	declarations: [LuSelectInputComponent],
	exports: [LuSelectInputComponent],
})
export class LuSelectInputModule {}
