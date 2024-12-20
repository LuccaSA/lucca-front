import { NgModule } from '@angular/core';
import { LuDropdownItemDirective } from './dropdown-item.directive';

/**
 * @deprecated use `LuDropdownItemDirective` instead
 */
@NgModule({
	imports: [LuDropdownItemDirective],
	exports: [LuDropdownItemDirective],
})
export class LuDropdownItemModule {}
