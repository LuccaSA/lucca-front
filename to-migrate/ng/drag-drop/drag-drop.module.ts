import { NgModule } from '@angular/core';
import { DragDropModule as CdkDragDropModule } from '@angular/cdk/drag-drop';

import { RouterModule } from '@angular/router';
import { DragDropComponent } from './drag-drop.component';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		DragDropComponent,
	],
	imports: [
		CdkDragDropModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: DragDropComponent },
		]),
	],
})
export class DragDropModule {}
