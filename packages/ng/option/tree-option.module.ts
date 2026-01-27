import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionOperatorModule } from './operator/index';
import { LuTreeOptionPickerModule } from './picker/index';
import { LuTreeOptionSelectAllModule } from './selector/index';

/**
 * @deprecated use `LuTreeOptionSelectAllComponent` instead
 */
@NgModule({
	imports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectAllModule],
	exports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectAllModule],
})
export class LuTreeOptionModule {}
