import { booleanAttribute, Component, ElementRef, HostBinding, input, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_READMORE_TRANSLATIONS } from './read-more.translate';


@Component({
	selector: 'lu-read-more',
	standalone: true,
	templateUrl: './read-more.component.html',
	styleUrls: ['./read-more.component.scss'],
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'readMore',
	},
})
export class ReadMoreComponent implements OnInit {
	intl = getIntl(LU_READMORE_TRANSLATIONS);

	lineClamp = input<number>(5);
	openOnly = input(false, { transform: booleanAttribute });
	textFlow = input(false, { transform: booleanAttribute });
	surface = input<null | 'sunken' | 'default' | string>(null);

	labelReadMore = this.intl.readMore;
	labelReadLess = this.intl.readLess;

	label = signal<string>(this.labelReadMore);

	contentRef = viewChild<ElementRef<HTMLDivElement>>('content');

	expanded = signal(false);
	isClamped = signal(false);

	@HostBinding('style.--components-readMore-lineClamp') get lines() {
		return this.lineClamp();
	}

	@HostBinding('style.--components-readMore-content-lastChild-content') get labelText() {
		return `'${this.labelReadLess}'`;
	}

	@HostBinding('class.is-disabled') get isDisabled() {
		return !this.expanded() && !this.isClamped();
	}

	@HostBinding('class.mod-openOnly') get isOpenOnly() {
		return this.openOnly();
	}

	@HostBinding('class.mod-sunken') get surfaceSunken() {
		return this.surface() === 'sunken';
	}

	@HostBinding('class.mod-default') get surfaceRaised() {
		return this.surface() === 'default';
	}

	@HostBinding('style.--components-readMore-link-backgroudColor') get backgroundColor() {
		if (this.surface() === 'sunken' || this.surface() === 'default' || this.surface() === null) {
			return null;
		}
		console.log('pasnull');
		return `${this.surface()}`;
	}

	ngOnInit(): void {
		new ResizeObserver(() => {
			const contentElement = this.contentRef()?.nativeElement;

			this.isClamped.set(contentElement.scrollHeight > contentElement.clientHeight);
		}).observe(this.contentRef().nativeElement);
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
