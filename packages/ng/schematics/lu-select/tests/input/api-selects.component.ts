import { Component } from '@angular/core';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-user-select>
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-establishment-select multiple placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-api-select api="/api/v3/legalEntities/scope" data-test-id="LegalEntitiesLuAPISelect" [placeholder]="'ALL_ESTABLISHMENTS' | translate" class="textfield-input" [filters]="scopedFilters" orderBy="name,asc" [formControl]="legalEntitiesFC" />
	`,
	imports: [LuUserSelectModule, LuQualificationSelectInputComponent, LuEstablishmentSelectInputComponent, LuApiSelectInputComponent]
})
export class ApiSelectsComponent {
}
