import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
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
	signal,
	TemplateRef,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FILTER_PILL_HOST_COMPONENT, FILTER_PILL_INPUT_COMPONENT } from '../core';

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
	// TODO Avoir un CVA sur la barre de filtres
	#locale = inject(LOCALE_ID);

	elementRef = inject(ElementRef);

	id = `filterPill-combobox-${nextId++}`;

	layout = computed(() => this.inputComponentRef()?.filterPillLayout?.() || 'default');

	inputComponentRef = contentChild(FILTER_PILL_INPUT_COMPONENT);

	popoverRef = viewChild(PopoverDirective);

	pillTpl: TemplateRef<unknown>;

	labelTpl = computed(() => this.customLabelTpl() || this.defaultLabelTpl());

	defaultLabelTpl = viewChild<TemplateRef<unknown>>('defaultLabel');

	customLabelTpl = signal<TemplateRef<unknown> | null>(null);

	name = input.required<string>();

	@HostBinding('class.u-mask')
	hidden = false;

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

	// TODO i18n placeholder
	placeholder = input<string>('Aucune valeur sélectionnée');

	icon = input<LuccaIcon>();

	defaultIcon = computed<LuccaIcon>(() => this.inputComponentRef()?.getDefaultFilterPillIcon?.() || 'arrowChevronBottom');

	displayedIcon = computed(() => this.icon() || this.defaultIcon());

	shouldHideCombobox = computed(() => this.inputComponentRef()?.hideCombobox?.() || false);

	inputIsEmpty = computed(() => this.inputComponentRef()?.isFilterPillEmpty());

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

	@HostBinding('class.is-empty')
	get isEmpty() {
		return this.inputIsEmpty();
	}

	@HostBinding('class.is-comboboxHidden')
	get hideCombobox() {
		return this.shouldHideCombobox();
	}

	constructor() {
		effect(() => {
			this.inputComponentRef()?.enableFilterPillMode();
			this.inputComponentRef()?.registerFilterPillClosePopover(this.closePopover);
			this.inputComponentRef()?.registerFilterPillUpdatePosition?.(this.updatePosition);
		});
	}

	@HostListener('click')
	hostClick(): void {
		this.inputComponentRef()?.onFilterPillClick?.();
	}

	closePopover = () => {
		this.popoverRef().close();
	};

	updatePosition = () => {
		this.popoverRef().updatePosition();
	};

	clear(): void {
		this.inputComponentRef()?.clearFilterPillValue();
	}
}
