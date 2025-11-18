import {
	AfterViewInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	effect,
	ElementRef,
	inject,
	Input,
	input,
	OnDestroy,
	output,
	TemplateRef,
	Type,
	viewChild,
	ViewChild,
} from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { asyncScheduler, observeOn, Subscription } from 'rxjs';
import { GroupTemplateLocation } from '../panel/panel.utils';
import { CoreSelectPanelElement } from '../panel/selectable-item';
import { LuOptionContext, SELECT_ID } from '../select.model';
import { LuOptionGrouping } from './group.directive';
import { LuOptionOutletDirective } from './option-outlet.directive';
import { ILuOptionContext, LU_OPTION_CONTEXT } from './option.token';
import { LU_OPTION_TRANSLATIONS } from './option.translate';
import { OptionComponent } from '@lucca-front/ng/listbox';

export const MAGIC_OPTION_SCROLL_DELAY = 15;

@Component({
	selector: 'lu-select-option',
	templateUrl: './option.component.html',
	styleUrl: './option.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [LuOptionOutletDirective, OptionComponent, CoreSelectPanelElement],
})
export class LuOptionComponent<T> implements AfterViewInit, OnDestroy {
	public selectableItem = viewChild('selectableItemRef', { read: CoreSelectPanelElement });
	protected listboxOptionRef = viewChild('listboxOption', { read: OptionComponent });
	protected intl = getIntl(LU_OPTION_TRANSLATIONS);

	public tree = input(false, { transform: booleanAttribute });

	public isSelected = input<boolean>(false);
	public selected = output<void>();

	@Input()
	public optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined;

	@Input() option?: T;
	@Input() grouping?: LuOptionGrouping<T, unknown>;

	hasChildren = input(false, { transform: booleanAttribute });
	onlyParent = output<void>();
	onlyChildren = output<void>();

	groupIndex = input<number>();

	public optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	@Input()
	scrollIntoViewOptions: ScrollIntoViewOptions = {};

	groupTemplateLocation = input<GroupTemplateLocation>();

	@ViewChild(LuOptionOutletDirective, { read: LU_OPTION_CONTEXT, static: false })
	private optionContext?: ILuOptionContext<T>;

	private cdr = inject(ChangeDetectorRef);
	private subscription?: Subscription;

	get id(): string {
		const groupPart = this.groupIndex() === undefined ? `` : `-group-${this.groupIndex()}`;

		return `lu-select-${this.selectId}${groupPart}-option-${this.optionIndex()}`;
	}

	protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	protected selectId = inject(SELECT_ID);

	constructor() {
		effect(() => {
			if (this.selectableItem()?.isHighlighted()) {
				setTimeout(() => {
					this.listboxOptionRef()?.optionContent().nativeElement.scrollIntoView(this.scrollIntoViewOptions);
				}, MAGIC_OPTION_SCROLL_DELAY);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.subscription = this.optionContext.isDisabled$.pipe(observeOn(asyncScheduler)).subscribe((isDisabled) => {
			this.selectableItem().disabled = isDisabled;
			this.cdr.markForCheck();
		});
	}

	selectOption($event: Event): void {
		if (this.selectableItem().disabled) {
			$event.stopPropagation();
		}
	}
}
