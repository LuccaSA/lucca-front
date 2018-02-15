import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuTreeComponent } from './tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuTreeItemComponent } from './tree/tree-item/tree-item.component';
import { ITree, ITreeNode } from './tree/tree.class';
import { TreePickerMessageService } from './tree/tree.message.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		OverlayModule,
	],
	providers: [
		TreePickerMessageService,
	],
	declarations: [
		LuTreeComponent,
		LuTreeItemComponent,
	],
	exports: [
		LuTreeComponent,
	]
})
export class LuTreeModule { }
