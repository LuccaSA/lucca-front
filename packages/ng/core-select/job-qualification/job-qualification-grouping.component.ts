import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { LuOptionGroupByContext } from '@lucca-front/ng/core-select';
import { LuCoreSelectJobQualification } from './models';

@Component({
	selector: 'lu-job-qualification-grouping',
	template: `{{ group.options[0].job.name }}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuJobQualificationGroupingComponent {
	group = inject<LuOptionGroupByContext<LuCoreSelectJobQualification, number>>(PORTAL_CONTEXT).$implicit;
}
