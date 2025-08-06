import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	effect,
	ElementRef,
	forwardRef,
	HostBinding,
	HostListener,
	inject,
	input,
	LOCALE_ID,
	model,
	signal,
	TemplateRef,
	untracked,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FILTER_PILL_HOST_COMPONENT, FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent } from '../core';
import { LU_FILTER_PILLS_TRANSLATIONS } from '../filter-pills.translate';

let nextId = 0;

@Component({
	selector: 'lu-filter-pill',
	standalone: true,
	imports: [PopoverDirective, FormsModule, IconComponent, NgTemplateOutlet, LuTooltipModule],
	templateUrl: './filter-pill.component.html',
	styleUrl: './filter-pill.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FILTER_PILL_HOST_COMPONENT,
			useExisting: forwardRef(() => FilterPillComponent),
		},
	],
	host: {
		class: 'filterPill',
	},
})
export class FilterPillComponent {
	intl = getIntl(LU_FILTER_PILLS_TRANSLATIONS);

	#locale = inject(LOCALE_ID);

	elementRef = inject(ElementRef);

	id = `filterPill-combobox-${nextId++}`;

	layout = computed(() => this.inputComponentRef()?.filterPillLayout?.() || 'default');

	// The easy way to grab input component, will work in most cases
	childInputComponentRef = contentChild(FILTER_PILL_INPUT_COMPONENT);

	// The harder way, because child has to register itself to the host, might become the default approach if this is required too much
	// (like when child isn't created when component inits or it's too deep)
	registeredInputComponentRef = signal<FilterPillInputComponent | null>(null);

	inputComponentRef = computed(() => this.registeredInputComponentRef() || this.childInputComponentRef());

	popoverRef = viewChild(PopoverDirective);

	pillTpl: TemplateRef<unknown>;

	labelTpl = computed(() => this.customLabelTpl() || this.defaultLabelTpl());

	defaultLabelTpl = viewChild<TemplateRef<unknown>>('defaultLabel');

	customLabelTpl = signal<TemplateRef<unknown> | null>(null);

	name = input<string>();

	optional = input(false, { transform: booleanAttribute });

	disabled = computed(() => this.inputComponentRef()?.filterPillDisabled?.() || false);

	@HostBinding('class.is-hidden')
	get isHiddenClass() {
		return this.isHidden();
	}

	displayed = model(false);

	protected isHidden = computed(() => this.optional() && !this.displayed());

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'bottom' },
			{
				overlayX: 'start',
				overlayY: 'top',
			},
			-4,
			0,
		),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-4,
			0,
		),
	];

	label = input.required<string>();

	placeholder = input<string>(this.intl.placeholder);

	icon = input<LuccaIcon>();

	defaultIcon = computed<LuccaIcon>(() => this.inputComponentRef()?.getDefaultFilterPillIcon?.() || 'arrowChevronBottom');

	displayedIcon = computed(() => this.icon() || this.defaultIcon());

	shouldHideCombobox = computed(() => this.inputComponentRef()?.hideCombobox?.() || false);

	inputIsEmpty = computed(() => this.inputComponentRef()?.isFilterPillEmpty());
	inputIsClearable = computed(() => this.inputComponentRef()?.isFilterPillClearable());

	shouldShowColon = computed(() => this.inputComponentRef()?.showColon?.() || !this.inputIsEmpty());

	colonDisplay = computed(() => {
		if (!this.shouldShowColon()) {
			return '';
		}
		if (this.#locale === 'fr') {
			return ' :';
		}
		return ':';
	});

	modCheckbox = computed(() => this.layout() === 'checkable');

	@HostBinding('class.mod-checkbox')
	get isModCheckbox() {
		return this.modCheckbox();
	}

	@HostBinding('class.is-filled')
	get isFilled() {
		return !this.inputIsEmpty();
	}

	@HostBinding('class.is-comboboxHidden')
	get hideCombobox() {
		return this.shouldHideCombobox();
	}

	constructor() {
		effect(() => {
			const ref = this.inputComponentRef();
			if (ref) {
				untracked(() => {
					ref.enableFilterPillMode();
					ref.registerFilterPillClosePopover(this.closePopover);
					ref.registerFilterPillUpdatePosition?.(this.updatePosition);
				});
			}
		});

		effect(() => {
			// When an optional filter pill has a value, it must be displayed
			if (this.optional() && !this.inputIsEmpty() && !untracked(this.displayed)) {
				this.displayed.set(true);
			}
		});

		effect(() => {
			// When an optional filter pill is hidden, its value must be clear
			if (this.optional() && !this.displayed() && !untracked(this.inputIsEmpty)) {
				this.clear();
			}
		});
	}

	@HostListener('click')
	hostClick(): void {
		this.inputComponentRef()?.onFilterPillClick?.();
	}

	popoverOpened(): void {
		this.inputComponentRef()?.onFilterPillOpened?.();
	}

	closePopover = () => {
		this.popoverRef().close();
		this.inputComponentRef()?.onFilterPillClosed?.();
	};

	updatePosition = () => {
		this.popoverRef()?.updatePosition();
	};

	clear(): void {
		this.inputComponentRef()?.clearFilterPillValue();
	}

	registerInput(input: FilterPillInputComponent): void {
		this.registeredInputComponentRef.set(input);
	}
}
