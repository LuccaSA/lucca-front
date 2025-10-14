import { Component } from '@angular/core';
import { LuCoreSelectApiV3Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
import { LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select/user';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

@Component({
	selector: 'lu-select-schematic-api-selects',
	template: `
		<lu-simple-select jobQualifications placeholder="Select a qualification" class="textfield-input"></lu-simple-select>
		<lu-simple-select users placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-simple-select>
		<lu-simple-select establishments placeholder="Select an establishment" class="textfield-input"></lu-simple-select>
		<lu-multi-select establishments placeholder="Select an establishment" class="textfield-input"></lu-multi-select>
		<lu-simple-select apiV3="/api/v3/legalEntities/scope" data-test-id="LegalEntitiesLuAPISelect" [placeholder]="'ALL_ESTABLISHMENTS' | translate" class="textfield-input" [filters]="scopedFilters" orderBy="name,asc" [formControl]="legalEntitiesFC" />
	`,
	imports: [LuSimpleSelectInputComponent, LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective, LuCoreSelectEstablishmentsDirective, LuMultiSelectInputComponent, LuCoreSelectApiV3Directive
	]
})
export class ApiSelectsComponent {
}
