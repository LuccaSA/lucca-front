import { NgModule } from '@angular/core';
import { LuTreeOptionPlaceholderComponent } from './tree-option-placeholder.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuTreeOptionPlaceholderComponent,
	],
	exports: [
		LuTreeOptionPlaceholderComponent,
	],
})
export class LuTreeOptionPlaceholderModule {}
