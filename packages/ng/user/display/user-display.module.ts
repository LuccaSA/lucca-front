import { NgModule } from '@angular/core';
import { LuUserDisplayPipe } from './user-display.pipe';

/**
 * @deprecated use `LuUserDisplayPipe` imports && `LuUserDisplayPipe` providers instead
 */
@NgModule({
	imports: [LuUserDisplayPipe],
	providers: [LuUserDisplayPipe],
	exports: [LuUserDisplayPipe],
})
export class LuUserDisplayModule {}
