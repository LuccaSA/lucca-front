import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { LuUserPickerModule } from '../../picker/index';

@NgModule({
	imports: [
		LuUserPickerModule,
	],
	declarations: [
		LuUserSelectInputComponent,
	],
	exports: [
		LuUserSelectInputComponent,
	],
})
export class LuUserSelectInputModule {}
