import { NgModule } from '@angular/core';
import { LuApiSelectModule } from './select/index';

@NgModule({
	imports: [LuApiSelectModule],
	exports: [LuApiSelectModule],
})
export class LuApiModule {}
