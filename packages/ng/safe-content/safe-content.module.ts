import { NgModule } from '@angular/core';
import { LuSafeHtmlPipe } from './safe-html.pipe';

/**
 * @deprecated use `LuSafeHtmlPipe` instead
 */
@NgModule({
	imports: [LuSafeHtmlPipe],
	exports: [LuSafeHtmlPipe],
})
export class LuSafeContentModule {}
