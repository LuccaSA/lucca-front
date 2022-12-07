import { NgModule } from '@angular/core';
import { LuUserDisplayPipe } from './user-display.pipe';

@NgModule({
	imports: [LuUserDisplayPipe],
	providers: [LuUserDisplayPipe],
	exports: [LuUserDisplayPipe],
})
export class LuUserDisplayModule {}
