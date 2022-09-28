import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SELECT_ID } from '../select.model';

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuOptionComponent<T> implements Highlightable {
	@HostBinding('class.optionItem')
	public hasOptionItemClass = true;

	@Input()
	@HostBinding('attr.aria-selected')
	isSelected = false;

	@Input()
	option?: T;

	@Input()
	public optionIndex = 0;

	isHighlighted$ = new BehaviorSubject(false);

	@Input()
	disabled = false;

	@HostBinding('attr.role')
	public role = 'option';

	@HostBinding('attr.id')
	public get id(): string {
		return `lu-select-${this.selectId}-option-${this.optionIndex}`;
	}

	constructor(protected elementRef: ElementRef<HTMLElement>, @Inject(SELECT_ID) protected selectId: number) {}

	setActiveStyles(): void {
		this.isHighlighted$.next(true);
		this.elementRef.nativeElement.scrollIntoView({ block: 'center' });
	}

	setInactiveStyles(): void {
		this.isHighlighted$.next(false);
	}
}
