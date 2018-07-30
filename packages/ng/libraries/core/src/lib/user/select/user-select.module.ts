import { NgModule } from '@angular/core';
import { LuUserSelectInputModule } from './input/index';
import { LuUserOperatorModule } from './operator/index';

@NgModule({
	imports: [
		LuUserSelectInputModule,
		LuUserOperatorModule,
	],
	exports: [
		LuUserSelectInputModule,
		LuUserOperatorModule,
	],
})
export class LuUserSelectModule {}
