import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NodeSassEndComponent } from './node-sass-end.component';
import { MatDatepickerModule, MatMenuModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
	declarations: [
		NodeSassEndComponent,
	],
	imports: [
		MatDatepickerModule,
		MatMomentDateModule,
		MatMenuModule,
		RouterModule.forChild([
			{ path: '', component: NodeSassEndComponent },
		]),
	],
})
export class NodeSassEndModule {}
