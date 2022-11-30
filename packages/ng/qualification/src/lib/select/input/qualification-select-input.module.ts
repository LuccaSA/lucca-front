import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuApiSearcherModule } from '@lucca-front/ng/api';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuForGroupsModule, LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputModule } from '@lucca-front/ng/select';
import { LuQualificationSelectInputComponent } from './qualification-select-input.component';

@NgModule({
	imports: [CommonModule, LuInputModule, LuOptionModule, LuSelectInputModule, LuForGroupsModule, LuApiSearcherModule],
	declarations: [LuQualificationSelectInputComponent],
	exports: [LuQualificationSelectInputComponent],
})
export class LuQualificationSelectInputModule {}
