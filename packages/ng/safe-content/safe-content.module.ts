import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuSafeHtmlPipe } from './safe-html.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [LuSafeHtmlPipe],
	exports: [LuSafeHtmlPipe],
	providers: [],
})
export class LuSafeContentModule {}
