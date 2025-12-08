import { NgModule } from '@angular/core';
import { LuDateInputDirective } from './date-input.directive';

/**
 * @deprecated use `LuDateInputDirective` instead
 */
@NgModule({
	imports: [LuDateInputDirective],
	exports: [LuDateInputDirective],
})
export class LuDateInputModule {}
