import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectOverlapComponent } from './select-overlap.component';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		SelectOverlapComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: SelectOverlapComponent },
		]),
	],
})
export class SelectOverlapModule {}
