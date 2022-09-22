import { NgModule } from '@angular/core';
import { LuOptionItemComponent } from './item/index';
import { LuOptionOperatorModule } from './operator/index';
import { LuOptionPickerModule } from './picker/index';
import { LuOptionPlaceholderComponent } from './placeholder/index';
import { LuOptionSelectAllComponent } from './selector/index';

@NgModule({
	imports: [LuOptionItemComponent, LuOptionPickerModule, LuOptionOperatorModule, LuOptionSelectAllComponent, LuOptionPlaceholderComponent],
	exports: [LuOptionItemComponent, LuOptionPickerModule, LuOptionOperatorModule, LuOptionSelectAllComponent, LuOptionPlaceholderComponent],
})
export class LuOptionModule {}
