import { ChangeDetectionStrategy, Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { BoxTheme } from '../box.type';

@Component({
	selector: 'lu-box-disclosure',
	imports: [IconComponent, PortalDirective, ListingComponent, ListingItemComponent],
	templateUrl: './box-disclosure.component.html',
	styleUrl: './box-disclosure.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class BoxDisclosureComponent {
	/**
	 * Background theme of the disclosure box. Fancy themes highlight the box from the rest of the page.
	 * Defaults to white.
	 */
	readonly theme = input<BoxTheme>('white');

	/**
	 * The title of the disclosure box, displayed in the clickable summary
	 */
	readonly heading = input.required<PortalContent>();

	/**
	 * Text displayed below the title, visible when the disclosure box is closed
	 */
	readonly subtitle = input<PortalContent>();

	/**
	 * Short information displayed before the chevron, visible when the disclosure box is closed.
	 * An array of strings is rendered as an inline listing.
	 * A template can be given for specific cases: it is rendered inside the summary, so it must not contain interactive elements.
	 */
	readonly metadata = input<string[] | PortalContent>();

	readonly metadataItems = computed(() => {
		const metadata = this.metadata();
		return Array.isArray(metadata) ? metadata : null;
	});

	/**
	 * Whether the disclosure box is open.
	 */
	readonly open = model(false);

	readonly themeClasses = computed(() => {
		const theme = this.theme();
		return {
			'mod-neutral': theme === 'neutral',
			'mod-sunken': theme === 'sunken',
			'mod-fancyLight': theme === 'fancyLight',
			'mod-fancyDark': theme === 'fancyDark',
		};
	});

	public onToggle(event: Event) {
		if (event.target instanceof HTMLDetailsElement) {
			this.open.set(event.target.open);
		}
	}
}
