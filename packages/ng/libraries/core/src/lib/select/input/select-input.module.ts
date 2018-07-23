import { NgModule } from '@angular/core';
// import { LuPopoverModule } from '../../popover/index';
import { LuSelectInputComponent } from './select-input.component';

@NgModule({
	imports: [
		// LuPopoverModule,
	],
	declarations: [
		LuSelectInputComponent,
	],
	exports: [
		LuSelectInputComponent,
	],
})
export class LuSelectInputModule {}
