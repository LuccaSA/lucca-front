import { InputSignalWithTransform, Signal } from '@angular/core';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
import { NumericBadgeComponent } from '@lucca/prisme/numeric-badge';
import {
	SkeletonButtonComponent,
	SkeletonCardComponent,
	SkeletonDataTableComponent,
	SkeletonFieldComponent,
	SkeletonHeaderComponent,
	SkeletonHighlightDataComponent,
	SkeletonIndexTableComponent,
	SkeletonTableComponent,
} from '@lucca/prisme/skeleton';
import { TagComponent } from '@lucca/prisme/tag';
import { LuTooltipTriggerDirective } from '@lucca/prisme/tooltip';

type InputBindings<C, K extends keyof C> = { -readonly [P in K]: C[P] extends InputSignalWithTransform<unknown, infer W> ? W : never };
type ExpectedBindings<T, B> = { [C in keyof T]: { [P in keyof T[C]]: B } };
type AnyBinding<T> = { [C in keyof T]: T[C][keyof T[C]] }[keyof T];

type BooleanInputs = {
	ButtonComponent: InputBindings<ButtonComponent, 'block' | 'disabled' | 'critical' | 'delete' | 'disclosure'>;
	IconComponent: InputBindings<IconComponent, 'AI'>;
	NumericBadgeComponent: InputBindings<NumericBadgeComponent, 'loading' | 'disableTooltip'>;
	SkeletonButtonComponent: InputBindings<SkeletonButtonComponent, 'dark'>;
	SkeletonDataTableComponent: InputBindings<SkeletonDataTableComponent, 'dataTableBodyOnly'>;
	SkeletonFieldComponent: InputBindings<SkeletonFieldComponent, 'dark' | 'hiddenLabel'>;
	SkeletonHeaderComponent: InputBindings<SkeletonHeaderComponent, 'dark'>;
	SkeletonHighlightDataComponent: InputBindings<SkeletonHighlightDataComponent, 'dark'>;
	SkeletonIndexTableComponent: InputBindings<SkeletonIndexTableComponent, 'tableBodyOnly'>;
	SkeletonTableComponent: InputBindings<SkeletonTableComponent, 'tableBodyOnly'>;
	TagComponent: InputBindings<TagComponent, 'outlined' | 'hiddenLabel' | 'withEllipsis' | 'AI'>;
	LuTooltipTriggerDirective: InputBindings<
		LuTooltipTriggerDirective,
		'luTooltipDisabled' | 'prTooltipDisabled' | 'luTooltipOnlyForDisplay' | 'prTooltipOnlyForDisplay' | 'luTooltipWhenEllipsisInput' | 'prTooltipWhenEllipsisInput'
	>;
};

type NumberInputs = {
	NumericBadgeComponent: InputBindings<NumericBadgeComponent, 'maxValue'>;
	SkeletonCardComponent: InputBindings<SkeletonCardComponent, 'descriptionLines'>;
	SkeletonDataTableComponent: InputBindings<SkeletonDataTableComponent, 'cols' | 'rows'>;
	SkeletonFieldComponent: InputBindings<SkeletonFieldComponent, 'rows'>;
	SkeletonIndexTableComponent: InputBindings<SkeletonIndexTableComponent, 'cols' | 'rows'>;
	SkeletonTableComponent: InputBindings<SkeletonTableComponent, 'cols' | 'rows'>;
	LuTooltipTriggerDirective: InputBindings<LuTooltipTriggerDirective, 'luTooltipEnterDelay' | 'prTooltipEnterDelay' | 'luTooltipLeaveDelay' | 'prTooltipLeaveDelay'>;
};

describe('prisme input bindings', () => {
	it('accepts a boolean or a boolean attribute on boolean inputs', () => {
		expectTypeOf<BooleanInputs>().toEqualTypeOf<ExpectedBindings<BooleanInputs, boolean | `${boolean}` | ''>>();
	});

	it('accepts a number or a number attribute on number inputs', () => {
		expectTypeOf<NumberInputs>().toEqualTypeOf<ExpectedBindings<NumberInputs, number | `${number}`>>();
	});

	it('rejects an uncalled signal', () => {
		expectTypeOf<Signal<boolean>>().not.toExtend<AnyBinding<BooleanInputs>>();
		expectTypeOf<Signal<number>>().not.toExtend<AnyBinding<NumberInputs>>();
	});
});
