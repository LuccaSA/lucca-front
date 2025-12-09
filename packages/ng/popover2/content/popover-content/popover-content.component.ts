import { CdkObserveContent } from '@angular/cdk/observers';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { Subject } from 'rxjs';
import { PopoverFocusTrap } from '../../popover-focus-trap';
import { POPOVER_CONFIG } from '../../popover-tokens';
import { LU_POPOVER2_TRANSLATIONS } from '../../popover.translate';

@Component({
	selector: 'lu-popover-content',
	imports: [ButtonComponent, IconComponent, CdkObserveContent, PortalDirective],
	templateUrl: './popover-content.component.html',
	styleUrl: './popover-content.component.scss',
	host: {
		'[attr.id]': 'config.contentId',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent implements AfterViewInit {
	intl = getIntl(LU_POPOVER2_TRANSLATIONS);

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	config = inject(POPOVER_CONFIG);

	destroyRef = inject(DestroyRef);

	content = this.config.content;

	#focusManager = new PopoverFocusTrap(this.#elementRef.nativeElement, this.config.triggerElement);

	closed$ = new Subject<void>();

	contentChangedDebounceTime = 100;

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

	contentChanged() {
		this.config.ref.updatePosition();
	}

	ngAfterViewInit(): void {
		this.#focusManager.attachAnchors();
		if (!this.config.disableCloseButtonFocus) {
			void this.#focusManager.focusInitialElementWhenReady();
		}
	}

	grabFocus(): void {
		this.#focusManager.focusInitialElement();
	}

	@HostListener('window:keydown.escape')
	close(): void {
		if (!this.config.disableInitialTriggerFocus) {
			// Focus initial trigger element
			this.config.triggerElement.focus();
		}
		// Tell the directive we're closed now
		this.closed$.next();
		this.closed$.complete();
		this.mouseEnter$.complete();
		this.mouseLeave$.complete();
		// Detach overlay
		this.config.ref.dispose();
	}
}
