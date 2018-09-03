import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { DemoSelectFoundationsComponent } from './select-foundations.component';
import { BasicComponent } from './basic/basic';
import { DisplayerComponent } from './displayer/displayer';
import { ClearerComponent } from './clearer/clearer';
import { MultipleComponent } from './multiple/multiple';

import { SharedModule } from '../../shared';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuSelectModule,
		LuOptionModule,

		LuInputModule,
	],
	declarations: [
		DemoSelectFoundationsComponent,
		BasicComponent,
		DisplayerComponent,
		ClearerComponent,
		MultipleComponent,
	],
	exports: [DemoSelectFoundationsComponent],
})
export class DemoSelectFoundationsModule {}
