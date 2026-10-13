import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { Observable, of } from 'rxjs';

class StaticBreakpointObserver {
	constructor(private readonly matches: boolean) {}

	observe(): Observable<BreakpointState> {
		return of({ matches: this.matches, breakpoints: {} });
	}

	isMatched(): boolean {
		return this.matches;
	}
}

const forceNarrowBreakpoint = { provide: BreakpointObserver, useValue: new StaticBreakpointObserver(true) };

@Component({
	selector: 'select-narrow-stories',
	templateUrl: './select-narrow.stories.html',
	imports: [LuSimpleSelectInputComponent, LuMultiSelectInputComponent, FormsModule, FilterLegumesPipe, FormFieldComponent, LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [forceNarrowBreakpoint],
})
class SelectNarrowStory {
	legumes: ILegume[] = allLegumes;

	simpleClue = '';
	multiClue = '';

	simpleValue: ILegume | null = null;
	multiValue: ILegume[] = [];

	simpleFilled: ILegume | null = allLegumes[0];
	multiFilled: ILegume[] = allLegumes.slice(0, 3);
}

export default {
	title: 'QA/Select/Narrow',
	component: SelectNarrowStory,
} as Meta;

export const Basic: StoryObj<SelectNarrowStory> = {
	args: {},
	render: () => ({ template: '<select-narrow-stories />' }),
};
