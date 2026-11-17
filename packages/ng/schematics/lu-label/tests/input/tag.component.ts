import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'app-tag',
	imports: [IconComponent],
	template: `
		<span class="label palette-neutral">Archivé</span>
		<span class="label palette-blueberry">{{ category.name }}</span>
		<span class="label">{{ typeLabels[exception.type] }}</span>
		<span class="label palette-product">Nouveau</span>
		<span class="label palette-neutral"><lu-icon icon="boxArchive" size="S" />Archivé</span>
		<span class="label palette-grey"><span aria-hidden="true" class="label-icon lucca-icon icon-signInfo"></span>Info</span>
		<span class="label palette-neutral">{{ count }} collaborateurs</span>
	`,
})
export class TagCasesComponent {}
