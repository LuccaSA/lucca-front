import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
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
	selector: 'select-narrow-panel-multi',
	template: `
		<lu-form-field label="Légumes">
			<lu-multi-select [options]="legumes" [(ngModel)]="value" />
		</lu-form-field>
	`,
	imports: [LuMultiSelectInputComponent, FormsModule, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [forceNarrowBreakpoint],
})
class SelectNarrowPanelMultiComponent implements AfterViewInit {
	legumes: ILegume[] = allLegumes;
	value: ILegume[] = [];

	private readonly selectRef = viewChild.required(LuMultiSelectInputComponent);

	ngAfterViewInit(): void {
		setTimeout(() => this.selectRef().openPanel());
	}
}

export default {
	title: 'QA/Select/Narrow/Panel/Live/Multi',
	component: SelectNarrowPanelMultiComponent,
} as Meta;

export const Basic: StoryObj<SelectNarrowPanelMultiComponent> = {
	args: {},
	render: () => ({ template: '<select-narrow-panel-multi />' }),
};
