import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserTileComponent } from './user-tile.component';
import { LuUserTileModule } from '../../../../src/app/user';
import { SharedModule } from '../../shared/index';
import { BasicComponent } from './basic/basic.component';
import { MatTooltipModule } from '@angular/material';
import { DisplayFormatComponent } from './displayFormat/display-format.component';
import { SizesComponent } from './sizes/sizes.component';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
		SharedModule,
		MatTooltipModule
	],
	declarations: [
		DemoUserTileComponent,
		BasicComponent,
		DisplayFormatComponent,
		SizesComponent,
	],
	exports: [
		DemoUserTileComponent,
		BasicComponent,
		DisplayFormatComponent,
		SizesComponent,
	],
})
export class DemoUserTileModule { }
