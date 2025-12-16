import { NgModule } from '@angular/core';
import { LuForTreeOptionsDirective } from './for-tree-options.directive';

/**
 * @deprecated use `LuForTreeOptionsDirective` instead
 */
@NgModule({
	imports: [LuForTreeOptionsDirective],
	exports: [LuForTreeOptionsDirective],
})
export class LuForTreeOptionsModule {}
