import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoAnimationComponent } from './animation';
import { FadingComponent } from './fading/fading';
import { SlidingComponent } from './sliding/sliding';
import { ScalingComponent } from './scaling/scaling';
import { SharedModule } from '../shared';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [
		DemoAnimationComponent,
		SlidingComponent,
		ScalingComponent,
		FadingComponent,
	],
	exports: [DemoAnimationComponent],
})
export class DemoAnimationsModule {}
