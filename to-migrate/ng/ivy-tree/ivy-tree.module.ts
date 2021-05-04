import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { IvyTreeComponent } from './ivy-tree.component';

import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuTreeOptionModule } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		IvyTreeComponent,
	],
	imports: [
		LuSelectModule,
		LuInputModule,
		FormsModule,
		LuTreeOptionModule,
		RouterModule.forChild([
			{ path: '', component: IvyTreeComponent },
		]),
	],
})
export class IvyTreeModule {}
