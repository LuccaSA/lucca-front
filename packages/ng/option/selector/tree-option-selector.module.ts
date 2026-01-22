import { NgModule } from '@angular/core';
import { LuTreeOptionSelectAllModule } from './all/index';

/**
 * @deprecated use `LuTreeOptionSelectAllComponent` instead
 */
@NgModule({
	imports: [LuTreeOptionSelectAllModule],
	exports: [LuTreeOptionSelectAllModule],
})
export class LuTreeOptionSelectorModule {}
