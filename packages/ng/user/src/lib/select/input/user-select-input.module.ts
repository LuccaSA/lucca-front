import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';

@NgModule({
	// imports: [
	// 	CommonModule,
	// 	LuUserDisplayModule,
	// 	LuOptionOperatorModule,
	// 	LuOptionPickerModule,
	// 	LuInputClearerComponent,
	// 	LuUserSearcherModule,
	// 	LuInputDisplayerModule,
	// 	LuUserHomonymsModule,
	// LuUserMeOptionModule,
	// ],
	imports: [LuUserSelectInputComponent],
	exports: [LuUserSelectInputComponent],
})
export class LuUserSelectInputModule {}
