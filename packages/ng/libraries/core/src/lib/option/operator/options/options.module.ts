import { NgModule } from '@angular/core';
import { LuOptionsComponent } from './options.component';
import { CommonModule } from '@angular/common';
import { LuForOptionsDirective } from './for-options.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionsComponent,
		LuForOptionsDirective,
	],
	exports: [
		LuOptionsComponent,
		LuForOptionsDirective,
	],
})
export class LuOptionsModule {}
