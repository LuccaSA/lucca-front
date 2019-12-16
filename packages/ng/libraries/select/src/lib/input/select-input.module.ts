import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LayoutModule,
	],
	declarations: [
		LuSelectInputComponent,
	],
	exports: [
		LuSelectInputComponent,
	],
})
export class LuSelectInputModule {}
