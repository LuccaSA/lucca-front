import { NgModule } from '@angular/core';
import { LuInputClearerComponent } from './clearer.component';

/**
 * @deprecated use `ClearComponent` instead
 */
@NgModule({
	imports: [LuInputClearerComponent],
	exports: [LuInputClearerComponent],
})
export class LuInputClearerModule {}
