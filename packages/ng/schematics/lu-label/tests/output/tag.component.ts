import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-tag',
	imports: [IconComponent, TagComponent],
	template: `
		<lu-tag label="Archivé" palette="neutral" outlined />
		<lu-tag label="{{ category.name }}" palette="blueberry" outlined />
		<lu-tag label="{{ typeLabels[exception.type] }}" palette="product" outlined />
		<lu-tag label="Nouveau" palette="product" outlined />
		<lu-tag label="Archivé" icon="boxArchive" palette="neutral" outlined />
		<lu-tag label="Info" icon="signInfo" palette="neutral" outlined />
		<lu-tag label="{{ count }} collaborateurs" palette="neutral" outlined />
	`,
})
export class TagCasesComponent {}
