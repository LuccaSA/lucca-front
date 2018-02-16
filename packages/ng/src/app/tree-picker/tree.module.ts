import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuTreeComponent } from './standalone-tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuTreeItemComponent } from './standalone-tree/tree-item/tree-item.component';
import { ITree, ITreeNode } from './standalone-tree/tree.class';
import { TreePickerMessageService } from './standalone-tree/tree.message.service';
import { LuTreePickerComponent } from './picker';
import { LuPopoverModule } from './../popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		OverlayModule,
		LuPopoverModule,
	],
	providers: [],
	declarations: [
		LuTreeComponent,
		LuTreeItemComponent,
		LuTreePickerComponent,
	],
	exports: [
		LuTreeComponent,
		LuTreePickerComponent,
	]
})
export class LuTreeModule { }
