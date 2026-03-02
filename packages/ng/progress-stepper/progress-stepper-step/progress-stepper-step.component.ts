import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_PROGRESS_STEPPER_INSTANCE } from '../progress-stepper.token';

@Component({
	selector: 'lu-progress-stepper-step',
	templateUrl: './progress-stepper-step.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, LuTooltipTriggerDirective],
	host: {
		class: 'progressStepper-list-step',
		role: 'listitem',
		'[attr.aria-current]': 'this.position() === this.progressStepperRef.current() ? "step" : null',
		'[class.is-success]': 'state() === "success"',
		'[class.is-critical]': 'state() === "critical"',
	},
})
export class ProgressStepperStepComponent {
	protected progressStepperRef = inject(LU_PROGRESS_STEPPER_INSTANCE);

	readonly label = input.required<string>();
	readonly state = input<'success' | 'critical' | null>(null);

	position = computed(() => {
		return this.progressStepperRef.steps().indexOf(this) + 1;
	});
}
