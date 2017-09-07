import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserTileComponent } from './user-tile.component';
import { LuUserTileModule } from '../../../src/app/user-tile/user-tile.module';
import {SharedModule} from '../shared/index';
import { BasicComponent } from './basic/basic.component';
import {MdTooltipModule} from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
		SharedModule,
		MdTooltipModule
	],
	declarations: [DemoUserTileComponent, BasicComponent],
	exports: [DemoUserTileComponent, BasicComponent]
})
export class DemoUserTileModule { }
