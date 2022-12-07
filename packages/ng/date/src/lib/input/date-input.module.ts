import { NgModule } from '@angular/core';
import { LuDateInputDirective } from './date-input.directive';

@NgModule({
	imports: [LuDateInputDirective],
	exports: [LuDateInputDirective],
})
export class LuDateInputModule {}
