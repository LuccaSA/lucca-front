import { Highlightable } from '@angular/cdk/a11y';
import { AsyncPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, TemplateRef, Type, ViewChild, inject } from '@angular/core';
import { PortalDirective } from '@lucca-front/ng/core';
import { BehaviorSubject, Subscription, asyncScheduler, observeOn } from 'rxjs';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LuOptionGrouping } from './group.directive';
import { LuOptionGroupPipe } from './group.pipe';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';

export const MAGIC_OPTION_SCROLL_DELAY = 15;

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [AsyncPipe, LuOptionOutletDirective, NgIf, PortalDirective, LuOptionGroupPipe],
})
export class LuOptionComponent<T> implements Highlightable, AfterViewInit, OnDestroy {
	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined;

	@Input()
	@HostBinding('attr.aria-selected')
	isSelected = false;

	@Input() option?: T;
	@Input() grouping?: LuOptionGrouping<T, unknown>;

	@Input()
	public optionIndex = 0;

	@Input()
	scrollIntoViewOptions: ScrollIntoViewOptions = {};

	isHighlighted$ = new BehaviorSubject(false);

	/**
	 * Whether option is disabled. Used by ListKeyManager.
	 */
	disabled = false;

	@ViewChild(LuOptionOutletDirective, { read: LU_OPTION_CONTEXT, static: true })
	private optionContext?: ILuOptionContext<T>;

	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	@HostBinding('attr.role')
	public role = 'option';

	@HostBinding('attr.id')
	public get id(): string {
		return `lu-select-${this.selectId}-option-${this.optionIndex}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	setActiveStyles(): void {
		this.isHighlighted$.next(true);
		// Somehow, adding this small delay works, even tho 0ms delay doesn't, I think there's
		// a race condition somewhere that I can't find so this will just fix it for now.
		setTimeout(() => {
			this.elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
		}, MAGIC_OPTION_SCROLL_DELAY);
	}

	setInactiveStyles(): void {
		this.isHighlighted$.next(false);
	}

	selectOption($event: Event): void {
		if (this.disabled) {
			$event.stopPropagation();
		}
	}
}
