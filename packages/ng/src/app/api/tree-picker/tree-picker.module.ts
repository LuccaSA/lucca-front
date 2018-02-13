import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuTreePickerComponent } from './tree-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { LuPopoverModule } from '../../popover';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuTreePickerItemComponent } from './tree-picker-item/tree-picker-item.component';
import { ITree, ITreeNode } from './tree-picker.class';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		OverlayModule,
	],
	providers: [
	],
	declarations: [
		LuTreePickerComponent,
		LuTreePickerItemComponent,
	],
	exports: [
		LuTreePickerComponent,
	]
})
export class LuTreePickerModule { }
