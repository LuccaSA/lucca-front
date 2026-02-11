import { NgModule } from '@angular/core';
import { LuToastsComponent } from './toasts.component';

/**
 * @deprecated use `LuToastsComponent` instead
 */
@NgModule({
	imports: [LuToastsComponent],
	exports: [LuToastsComponent],
})
export class LuToastsModule {}
