import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuToastsComponent } from './toasts.component';

@NgModule({
	declarations: [LuToastsComponent],
	imports: [CommonModule],
	exports: [LuToastsComponent],
})
export class LuToastsModule {}
