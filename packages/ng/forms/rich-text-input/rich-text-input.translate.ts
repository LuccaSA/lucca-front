import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_RICH_TEXT_INPUT_TRANSLATIONS = new InjectionToken('LuRichTextInputTranslations', {
	factory: () => luRichTextInputTranslations,
});

export interface ILuRichTextInputLabel {
	clearFormat: string;

	linksCancel: string;
	linksDelete: string;
	linksHref: string;
	linksLabel: string;
	linksSubmit: string;

	listsNumberedLabel: string;
	listsBulletLabel: string;

	headingsLabel: string;
	headings0: string;
	headings1: string;
	headings2: string;
	headings3: string;
	headings4: string;
	headings5: string;
	headings6: string;

	stylesItalic: string;
	stylesBold: string;
	stylesUnderline: string;
	stylesStrikethrough: string;
}

export const luRichTextInputTranslations: LuTranslation<ILuRichTextInputLabel> = Translations;
