import { NgModule } from '@angular/core';
import { LuOptionTemplateComponent } from './option-template.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionTemplateComponent,
	],
	exports: [
		LuOptionTemplateComponent,
	],
})
export class LuOptionTemplateModule {}
