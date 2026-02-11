import { NgModule } from '@angular/core';
import { LuNumberPipe } from './number.pipe';

/**
 * @deprecated use `LuNumberPipe` instead
 */
@NgModule({
	imports: [LuNumberPipe],
	exports: [LuNumberPipe],
})
export class LuNumberModule {}
