import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuTreeOptionItemComponent } from './tree-option-item.component';

@NgModule({
	declarations: [LuTreeOptionItemComponent],
	exports: [LuTreeOptionItemComponent],
	imports: [CommonModule, LuTooltipModule],
})
export class LuTreeOptionItemModule {}
