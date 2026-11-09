import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectLegalUnitEstablishmentDirective, LuLegalUnitEstablishmentSelection } from '@lucca-front/ng/core-select/legal-unit-establishment';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

interface LegalUnitEstablishmentBasicStory {
	label: string;
	clearable: boolean;
	selection: LuLegalUnitEstablishmentSelection | null;
}

export default {
	title: 'Documentation/Forms/Legal unit establishment select/Angular/Basic',
	argTypes: {
		label: {
			description: 'Libellé du champ.',
			control: { type: 'text' },
			table: { category: 'inputs' },
		},
		clearable: {
			description: 'Affiche la croix qui vide la sélection.',
			control: { type: 'boolean' },
			table: { category: 'inputs' },
		},
		selection: {
			description: 'Sélection courante. Les deux niveaux sont publiés séparément : une unité légale est une règle, un établissement un élément.',
			control: false,
			table: { category: 'models', type: { summary: 'LuLegalUnitEstablishmentSelection' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LuMultiSelectInputComponent, LuCoreSelectLegalUnitEstablishmentDirective, FormFieldComponent, FormsModule, JsonPipe, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	render: (args: LegalUnitEstablishmentBasicStory) => ({
		props: { ...args },
		template: cleanupTemplate(`<lu-form-field [label]="label">
	<lu-multi-select legalUnitEstablishment [maxValuesShown]="20" [clearable]="clearable" [(ngModel)]="selection" />
</lu-form-field>
<pr-story-model-display>{{ selection | json }}</pr-story-model-display>`),
	}),
} as Meta;

export const Basic = {
	args: {
		label: 'Unités légales et établissements',
		clearable: true,
		selection: null,
	},
};
