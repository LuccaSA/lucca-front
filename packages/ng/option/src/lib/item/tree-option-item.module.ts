import { NgModule } from '@angular/core';
import { LuTreeOptionItemComponent } from './tree-option-item.component';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuTreeOptionItemIntl } from './tree-option-item.intl';
import { luTreeOptionItemTranslations } from './tree-option-item.translate';
import { LU_TREE_OPTION_ITEM_TRANSLATIONS } from './tree-option-item.token';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LuTreeOptionItemComponent],
	exports: [LuTreeOptionItemComponent],
	imports: [CommonModule, LuTooltipModule],
	providers: [
		LuTreeOptionItemIntl,
		{
			provide: LU_TREE_OPTION_ITEM_TRANSLATIONS,
			useValue: luTreeOptionItemTranslations,
		},
	],
})
export class LuTreeOptionItemModule {}
