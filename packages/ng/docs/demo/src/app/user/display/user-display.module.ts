import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayComponent } from './user-display.component';
import { LuUserDisplayModule } from '../../../../../../dist';
import { MatSelectModule } from '@angular/material';

// import { SharedModule } from '../../shared';
import { BasicComponent } from './basic/basic.component';

@NgModule({
	imports: [
		CommonModule,
		// FormsModule,
		LuUserDisplayModule,
		// SharedModule,
		// MatSelectModule,
		// LuEmptyModule,
	],
	declarations: [DemoUserDisplayComponent, BasicComponent],
	exports: [DemoUserDisplayComponent, BasicComponent],
})
export class DemoUserDisplayModule {}
