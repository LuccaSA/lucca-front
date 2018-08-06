import { NgModule } from '@angular/core';
import { LuInputDisplayerModule } from './displayer/index';

@NgModule({
	imports: [LuInputDisplayerModule],
	exports: [LuInputDisplayerModule],
})
export class LuInputModule {}
