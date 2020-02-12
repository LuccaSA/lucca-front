import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactorSelectComponent } from './refactor-select.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
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
