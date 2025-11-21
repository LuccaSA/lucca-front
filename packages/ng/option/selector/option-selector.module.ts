import { NgModule } from '@angular/core';
import { LuOptionSelectAllModule } from './all/index';

/**
 * @deprecated use `LuOptionSelectAllComponent` instead
 */
@NgModule({
	imports: [LuOptionSelectAllModule],
	exports: [LuOptionSelectAllModule],
})
export class LuOptionSelectorModule {}
