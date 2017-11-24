import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoAnimationsComponent } from './animations.component';
import { BasicComponent } from './basic/basic.component';
import { SlidingComponent } from './sliding/sliding.component';
import { ScalingComponent } from './scaling/scaling.component';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
	],
	declarations: [DemoAnimationsComponent, SlidingComponent, ScalingComponent, BasicComponent],
	exports: [DemoAnimationsComponent]
})
export class DemoAnimationsModule { }
