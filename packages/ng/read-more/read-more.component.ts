import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, input, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { getIntl, isNil } from '@lucca-front/ng/core';
import { LU_READMORE_TRANSLATIONS } from './read-more.translate';

@Component({
	selector: 'lu-read-more',
	templateUrl: './read-more.component.html',
	styleUrl: './read-more.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'readMore',
		'[style.--components-readMore-lineClamp]': 'lineClamp()',
		'[style.--components-readMore-content-lastChild-content]': 'labelReadLess',
		'[class.is-disabled]': '!expanded() && !isClamped()',
		'[class.mod-openOnly]': 'openOnly()',
		'[class.mod-sunken]': 'surface() === `sunken`',
		'[class.mod-default]': 'surface() === `default`',
		'[style.--components-readMore-link-backgroudColor]': 'backgroundColor()',
	},
})
export class ReadMoreComponent implements OnInit {
	intl = getIntl(LU_READMORE_TRANSLATIONS);

	/**
	 * Change the number of lines displayed when collapsed
	 */
	readonly lineClamp = input<number>(5);

	/**
	 * Prevent the component from closing by hiding the "Read less" button
	 */
	readonly openOnly = input(false, { transform: booleanAttribute });

	/**
	 * Change the background color under the "Read more / less" button
	 */
	readonly textFlow = input(false, { transform: booleanAttribute });

	/**
	 * Apply the spacing of the Text Flow component
	 */
	readonly surface = input<null | 'sunken' | 'default' | string>(null);

	/**
	 * Allow content to be passed via innerHTML
	 */
	readonly innerContent = input<null | string>(null);

	labelReadMore = this.intl.readMore;
	labelReadLess = this.intl.readLess;

	label = signal<string>(this.labelReadMore);

	readonly contentRef = viewChild<ElementRef<HTMLDivElement>>('content');

	expanded = signal(false);
	isClamped = signal(false);

	readonly backgroundColor = computed(() => {
		if (this.surface() === 'sunken' || this.surface() === 'default' || this.surface() === null) {
			return null;
		}
		return `${this.surface()}`;
	});

	isNil = isNil;

	ngOnInit(): void {
		setTimeout(() => {
			new ResizeObserver(() => {
				const contentElement = this.contentRef()?.nativeElement;
				const lineHeight = parseFloat(window.getComputedStyle(contentElement).lineHeight);
				const totalLines = Math.round(contentElement.scrollHeight / lineHeight);

				this.isClamped.set(contentElement.scrollHeight > contentElement.clientHeight);
				if (!this.isClamped() && totalLines <= this.lineClamp()) {
					this.expanded.set(false);
				}
			}).observe(this.contentRef().nativeElement, { box: 'border-box' });
		});
	}

	toggleExpanded() {
		this.expanded.set(!this.expanded());

		if (this.expanded()) {
			this.label.set(this.labelReadLess);
		} else {
			this.label.set(this.labelReadMore);
		}
	}
}
