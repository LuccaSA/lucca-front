import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { BoxTheme } from '../box.type';

@Component({
	selector: 'lu-box-disclosure',
	imports: [IconComponent, BubbleIconComponent, PortalDirective],
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
	readonly description = input<PortalContent>();

	/**
	 * Icon displayed in a bubble next to the title. Not available with fancy themes.
	 */
	readonly icon = input<LuccaIcon>();

	/**
	 * Is the disclosure box open by default
	 */
	readonly open = input(false, { transform: luBooleanAttribute });

	/**
	 * Emit boolean event when the disclosure box is toggled
	 */
	readonly openChange = output<boolean>();

	readonly bubbleIcon = computed(() => (this.theme().startsWith('fancy') ? undefined : this.icon()));

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
			this.openChange.emit(event.target.open);
		}
	}
}
