import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionOperatorModule } from './operator/index';
import { LuTreeOptionPickerModule } from './picker/index';
import { LuTreeOptionSelectAllComponent } from './selector/index';

/**
 * @deprecated use `LuTreeOptionSelectAllComponent` instead
 */
@NgModule({
	imports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectAllComponent],
	exports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectAllComponent],
})
export class LuTreeOptionModule {}
