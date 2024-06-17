import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostBinding, HostListener, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverFocusTrap } from '../../popover-focus-trap';
import { Subject } from 'rxjs';
import { POPOVER_CONFIG } from '../../popover-tokens';
import { LU_POPOVER2_TRANSLATIONS } from '../../popover.translate';
import { getIntl } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-popover-content',
	standalone: true,
	imports: [NgTemplateOutlet, ButtonComponent, IconComponent],
	templateUrl: './popover-content.component.html',
	styleUrl: './popover-content.component.scss',

	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent implements AfterViewInit {
	intl = getIntl(LU_POPOVER2_TRANSLATIONS);

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#config = inject(POPOVER_CONFIG);

	destroyRef = inject(DestroyRef);

	@HostBinding('attr.id')
	contentId = this.#config.contentId;

	content: TemplateRef<unknown> = this.#config.content;

	#focusManager = new PopoverFocusTrap(this.#elementRef.nativeElement, this.#config.triggerElement);

	closed$ = new Subject<void>();

	mouseEnter$ = new Subject<void>();

	@HostListener('mouseenter')
	mouseEnter(): void {
		this.mouseEnter$.next();
	}

	mouseLeave$ = new Subject<void>();

	@HostListener('mouseleave')
	mouseLeave(): void {
		this.mouseLeave$.next();
	}

	ngAfterViewInit(): void {
		this.#focusManager.attachAnchors();
		if (!this.#config.disableFocusManipulation) {
			void this.#focusManager.focusInitialElementWhenReady();
		}
	}

	grabFocus(): void {
		if (!this.#config.disableFocusManipulation) {
			this.#focusManager.focusInitialElement();
		}
	}

	@HostListener('window:keydown.escape')
	close(): void {
		if (!this.#config.disableFocusManipulation) {
			// Focus initial trigger element
			this.#config.triggerElement.focus();
		}
		// Tell the directive we're closed now
		this.closed$.next();
		this.closed$.complete();
		this.mouseEnter$.complete();
		this.mouseLeave$.complete();
		// Detach overlay
		this.#config.ref.detach();
	}
}
