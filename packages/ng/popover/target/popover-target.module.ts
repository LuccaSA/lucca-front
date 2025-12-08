import { NgModule } from '@angular/core';
import { LuPopoverTargetDirective } from './popover-target.directive';

/**
 * @deprecated use `LuPopoverTargetDirective` instead
 */
@NgModule({
	imports: [LuPopoverTargetDirective],
	exports: [LuPopoverTargetDirective],
})
export class LuPopoverTargetModule {}
