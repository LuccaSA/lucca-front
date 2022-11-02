import { NgModule } from '@angular/core';
import { LuOptionItemComponent } from './item/index';
import { LuForGroupsDirective, LuForOptionsDirective, LuOptionFeederComponent, LuOptionOperatorModule, LuOptionPagerComponent, LuOptionSearcherComponent } from './operator/index';
import { LuOptionPickerAdvancedComponent, LuOptionPickerComponent } from './picker/index';
import { LuOptionPlaceholderComponent } from './placeholder/index';
import { LuOptionSelectAllComponent } from './selector/index';

@NgModule({
	imports: [
		LuOptionItemComponent,
		LuOptionPickerComponent,
		LuOptionPickerAdvancedComponent,
		LuOptionItemComponent,
		LuOptionPagerComponent,
		LuOptionFeederComponent,
		LuOptionSearcherComponent,
		LuForOptionsDirective,
		LuForGroupsDirective,
		LuOptionSelectAllComponent,
		LuOptionPlaceholderComponent,
	],
	exports: [LuOptionItemComponent, LuOptionPickerComponent, LuOptionOperatorModule, LuOptionSelectAllComponent, LuOptionPlaceholderComponent],
})
export class LuOptionModule {}
