import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionOperatorModule } from './operator/index';
import { LuTreeOptionPickerModule } from './picker/index';
import { LuTreeOptionSelectorModule } from './selector/index';

/**
 * @deprecated
 */
@NgModule({
	imports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectorModule],
	exports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectorModule],
})
export class LuTreeOptionModule {}
