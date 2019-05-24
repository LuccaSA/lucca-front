import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactorSelectComponent } from './refactor-select.component';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		RefactorSelectComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: RefactorSelectComponent },
		]),
	],
})
export class RefactorSelectModule {}
