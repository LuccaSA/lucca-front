import { ChangeDetectionStrategy, Component, contentChildren, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ProgressStepperStepComponent } from './progress-stepper-step/progress-stepper-step.component';
import { LU_PROGRESS_STEPPER_INSTANCE } from './progress-stepper.token';

@Component({
	selector: 'lu-progress-stepper',
	templateUrl: './progress-stepper.component.html',
	styleUrl: './progress-stepper.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'progressStepper',
	},
	providers: [
		{
			provide: LU_PROGRESS_STEPPER_INSTANCE,
			useExisting: forwardRef(() => ProgressStepperComponent),
		},
	],
})
export class ProgressStepperComponent {
	readonly current = input(1, { transform: numberAttribute });
	public readonly steps = contentChildren(ProgressStepperStepComponent);
}
