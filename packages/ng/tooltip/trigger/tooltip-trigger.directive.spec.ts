import { afterNextRender, ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';

@Component({
	selector: 'lu-tooltip-late-host',
	template: `<span luTooltip="Late tooltip">Late</span>`,
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LateHostComponent {}

/**
 * Creates the tooltip while the after-render hooks are running, which adds its sequence to the set
 * the runner is currently iterating: the sequence then starts at a later phase, with no value piped
 * from the phases that were already over.
 */
@Component({
	selector: 'lu-tooltip-late-creator',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LateCreatorComponent {
	readonly #viewContainerRef = inject(ViewContainerRef);

	constructor() {
		afterNextRender({
			write: () => {
				const ref = this.#viewContainerRef.createComponent(LateHostComponent);
				ref.changeDetectorRef.detectChanges();
			},
		});
	}
}

describe(LuTooltipTriggerDirective.name, () => {
	it('destroys a tooltip created while the after-render hooks were running', () => {
		const fixture = TestBed.createComponent(LateCreatorComponent);
		const appRef = TestBed.inject(ApplicationRef);
		appRef.attachView(fixture.componentRef.hostView);
		appRef.tick();
		appRef.tick();

		expect(() => fixture.destroy()).not.toThrow();
	});
});
