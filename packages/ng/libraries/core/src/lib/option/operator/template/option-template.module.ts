import { NgModule } from '@angular/core';
import { LuOptionTemplateComponent } from './option-template.component';
import { CommonModule } from '@angular/common';
import { LuOptionItemModule } from '../../item/index';

@NgModule({
	imports: [
		CommonModule,
		LuOptionItemModule,
	],
	declarations: [
		LuOptionTemplateComponent,
	],
	exports: [
		LuOptionTemplateComponent,
	],
})
export class LuOptionTemplateModule {}
