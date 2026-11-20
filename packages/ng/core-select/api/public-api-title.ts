import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';

export interface ɵLuCoreSelectPublicApiTitled {
	title: string;
	t9n?: { title?: Record<string, string> | null } | null;
}

export function ɵluPublicApiTitle(resource: ɵLuCoreSelectPublicApiTitled, locale: string): string {
	const translations = Object.entries(resource.t9n?.title ?? {});
	const culture = locale.toLowerCase();
	const language = culture.split('-')[0];
	const translation = translations.find(([key]) => key.toLowerCase() === culture) ?? translations.find(([key]) => key.toLowerCase().split('-')[0] === language);
	return translation?.[1] || resource.title;
}

@Component({
	selector: 'lu-core-select-public-api-title-option',
	imports: [AsyncPipe],
	template: `
		@if (context.option$ | async; as option) {
			{{ title(option) }}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ɵLuCoreSelectPublicApiTitleOptionComponent {
	protected context = inject<ILuOptionContext<ɵLuCoreSelectPublicApiTitled>>(LU_OPTION_CONTEXT);
	#locale = inject(LOCALE_ID);

	protected title(option: ɵLuCoreSelectPublicApiTitled): string {
		return ɵluPublicApiTitle(option, this.#locale);
	}
}
