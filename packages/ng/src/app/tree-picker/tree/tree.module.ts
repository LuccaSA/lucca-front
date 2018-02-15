import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LuTreeComponent, ITree, ITreeNode } from './index';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuTreeComponent,
	],
	exports: [
		LuTreeComponent,
	],
})
export class LuApiPickerModule { }
