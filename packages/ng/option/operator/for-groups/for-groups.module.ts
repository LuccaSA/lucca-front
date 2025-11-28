import { NgModule } from '@angular/core';
import { LuForGroupsDirective } from './for-groups.directive';

/**
 * @deprecated use `LuForGroupsDirective` instead
 */
@NgModule({
	imports: [LuForGroupsDirective],
	exports: [LuForGroupsDirective],
})
export class LuForGroupsModule {}
