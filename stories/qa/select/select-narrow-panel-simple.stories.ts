import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
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
	selector: 'select-narrow-panel-simple',
	template: `
		<lu-form-field label="Légume">
			<lu-simple-select [options]="legumes" [(ngModel)]="value" />
		</lu-form-field>
	`,
	imports: [LuSimpleSelectInputComponent, FormsModule, FormFieldComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [forceNarrowBreakpoint],
})
class SelectNarrowPanelSimpleComponent implements AfterViewInit {
	legumes: ILegume[] = allLegumes;
	value: ILegume | null = null;

	private readonly selectRef = viewChild.required(LuSimpleSelectInputComponent);

	ngAfterViewInit(): void {
		setTimeout(() => this.selectRef().openPanel());
	}
}

export default {
	title: 'QA/Select/Narrow/Panel/Live/Simple',
	component: SelectNarrowPanelSimpleComponent,
} as Meta;

export const Basic: StoryObj<SelectNarrowPanelSimpleComponent> = {
	args: {},
	render: () => ({ template: '<select-narrow-panel-simple />' }),
};
