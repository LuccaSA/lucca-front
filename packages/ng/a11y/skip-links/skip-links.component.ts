import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { SkipLinksService } from './skip-links.service';
import { LU_SKIP_LINKS_TRANSLATIONS } from './skip-links.translate';

@Component({
	selector: 'lu-skip-links',
	templateUrl: './skip-links.component.html',
	styleUrl: './skip-links.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class LuSkipLinksComponent {
	skipLinksService = inject(SkipLinksService);

	readonly intl = input(...intlInputOptions(LU_SKIP_LINKS_TRANSLATIONS));
}
