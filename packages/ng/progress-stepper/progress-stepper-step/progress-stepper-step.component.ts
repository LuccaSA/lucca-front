import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule, UrlTree } from '@angular/router';
import { isRouterLinkParam, LuTypeGuardPipe, RouterLinkParam } from '@lucca-front/ng/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { ProgressStepperStepState } from '../progress-stepper-step-type';
import { LU_PROGRESS_STEPPER_INSTANCE } from '../progress-stepper.token';

@Component({
	selector: 'lu-progress-stepper-step',
	templateUrl: './progress-stepper-step.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, LuTooltipTriggerDirective, RouterModule, RouterLink, LuTypeGuardPipe],
	host: {
		class: 'progressStepper-list-step',
		role: 'listitem',
		'[attr.aria-current]': 'this.position() === this.progressStepperRef.current() ? "step" : null',
		'[class.is-success]': 'state() === "success"',
		'[class.is-critical]': 'state() === "critical"',
	},
})
export class ProgressStepperStepComponent {
	protected readonly progressStepperRef = inject(LU_PROGRESS_STEPPER_INSTANCE);

	readonly label = input.required<string>();

	readonly state = input<ProgressStepperStepState | null>(null);

	readonly routerLinkParam = input<RouterLinkParam | string | readonly string[] | UrlTree | null | undefined>(null);

	protected readonly position = computed(() => this.progressStepperRef.steps().indexOf(this) + 1);

	protected readonly isRouterLinkParam = isRouterLinkParam;
}
