import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserSelectComponent } from './user-select.component';
import { LuUserSelectModule, LuUserTileModule, LuOptionModule, LuInputDisplayerModule, LuInputModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { BasicComponent } from './basic/basic';
import { LuSelectModule } from '@lucca-front/ng';
import { SearcherComponent } from './searcher/searcher';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuUserSelectModule,
		LuUserTileModule,
		SharedModule,
		LuSelectModule,
		LuOptionModule,
		LuInputDisplayerModule,
		LuInputModule,
	],
	declarations: [DemoUserSelectComponent, BasicComponent, SearcherComponent],
	exports: [DemoUserSelectComponent],
})
export class DemoUserSelectModule {}
