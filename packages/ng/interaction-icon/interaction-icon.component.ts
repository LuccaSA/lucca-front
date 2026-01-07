import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-interaction-icon',
	templateUrl: './interaction-icon.component.html',
	styleUrl: './interaction-icon.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'interactionIcon',
	},
	imports: [IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractionIconComponent {
	#sanitizer = inject(DomSanitizer);
	icon = input<LuccaIcon | null>(null);
	alt = input<string | null>(null);
	bubbleDirection = input<'top' | 'bottom' | 'left' | 'right' | 'auto'>('auto');

	path = computed(() => {
		if (this.bubbleDirection() === 'auto') {
			switch (this.icon()) {
				// left
				case 'arrowExternal':
				case 'transportPlane':
				case 'trendingGrowth':
					return '<path d="M8.00651 5.64635C18.6457.13287 39.6925-6.46497 39.9915 13.389c.1615 10.9651-1.8105 32.8794-21.2986 24.9002C-1.87482 29.8699-5.51972 12.5314 8.00651 5.64635" />';
				// right
				case 'branch':
				case 'chartHorizontalBar':
				case 'filtersSort':
					return '<path d="M1.39421 28.5773C-1.21019 17.0602-2.16686-4.50406 17.241.83508 27.9587 3.7872 48.7826 11.8348 35.9517 27.8147c-13.5398 16.8658-31.36761 15.3699-34.55749.7626" />';
				// bottom
				case 'app':
				case 'arrowLineTop':
				case 'mailPaperPlane':
				case 'officePenStar':
				case 'priceTag':
				case 'priorityLow':
				case 'priorityLower':
				case 'priorityLowest':
				case 'transportToll':
					return '<path d="M37.7474 23.6107c-5.8586 9.9853-19.6806 25.9805-30.21111 8.8116C1.7234 22.9383-8.01419 2.86756 12.0828.34323 33.2921-2.32265 45.2602 11.0244 37.7474 23.6107" />';
				// top
				default:
					return '<path d="M2.25264 16.3895C8.11117 6.4042 21.9332-9.59108 32.4637 7.57789c5.8129 9.48391 15.5505 29.55471-4.5465 32.07901C6.70786 42.3228-5.2602 28.9757 2.25264 16.3895" />';
			}
		} else {
			switch (this.bubbleDirection()) {
				case 'left':
					return '<path d="M8.00651 5.64635C18.6457.13287 39.6925-6.46497 39.9915 13.389c.1615 10.9651-1.8105 32.8794-21.2986 24.9002C-1.87482 29.8699-5.51972 12.5314 8.00651 5.64635" />';
				case 'right':
					return '<path d="M1.39421 28.5773C-1.21019 17.0602-2.16686-4.50406 17.241.83508 27.9587 3.7872 48.7826 11.8348 35.9517 27.8147c-13.5398 16.8658-31.36761 15.3699-34.55749.7626" />';
				case 'bottom':
					return '<path d="M37.7474 23.6107c-5.8586 9.9853-19.6806 25.9805-30.21111 8.8116C1.7234 22.9383-8.01419 2.86756 12.0828.34323 33.2921-2.32265 45.2602 11.0244 37.7474 23.6107" />';
				default:
					return '<path d="M2.25264 16.3895C8.11117 6.4042 21.9332-9.59108 32.4637 7.57789c5.8129 9.48391 15.5505 29.55471-4.5465 32.07901C6.70786 42.3228-5.2602 28.9757 2.25264 16.3895" />';
			}
		}
	});

	safePath = computed(() => this.#sanitizer.bypassSecurityTrustHtml(this.path()));
}
