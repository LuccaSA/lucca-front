import { Highlightable } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, inject, Injector, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { asyncScheduler, BehaviorSubject, observeOn, Subscription } from 'rxjs';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LU_OPTION_CONTEXT, optionContextFactory } from './option.token';

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	providers: [{ provide: LU_OPTION_CONTEXT, useFactory: optionContextFactory }],
})
export class LuOptionComponent<T> implements Highlightable, OnInit, OnDestroy {
	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	public optionTpl?: TemplateRef<LuOptionContext<T>>;

	@Input()
	@HostBinding('attr.aria-selected')
	isSelected = false;

	@Input()
	option?: T;

	@Input()
	public optionIndex = 0;

	isHighlighted$ = new BehaviorSubject(false);

	/**
	 * Whether option is disabled. Used by ListKeyManager.
	 */
	disabled = false;

	private optionContext = inject(LU_OPTION_CONTEXT);
	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	@HostBinding('attr.role')
	public role = 'option';

	@HostBinding('attr.id')
	public get id(): string {
		return `lu-select-${this.selectId}-option-${this.optionIndex}`;
	}

	constructor(protected elementRef: ElementRef<HTMLElement>, @Inject(SELECT_ID) protected selectId: number, public injector: Injector) {}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	setActiveStyles(): void {
		this.isHighlighted$.next(true);
		this.elementRef.nativeElement.scrollIntoView({ block: 'center' });
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
