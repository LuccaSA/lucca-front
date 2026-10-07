import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ALuDateAdapter, ELuDateGranularity, LuStringDateAdapter } from '@lucca-front/ng/core';
import { LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { Meta, applicationConfig, moduleMetadata } from '@storybook/angular-vite';
import { generateMarkdownCodeBlock, getStoryGenerator, useDocumentationStory } from '@/helpers/stories';

type StoryComponent = LuDateSelectInputComponent<string> & { selectedDate: string; secondSelectedDate: string };

const generateStory = getStoryGenerator<StoryComponent>({
	argTypes: {
		selectedDate: { control: { type: 'text' }, table: { type: { summary: 'D' }, category: 'inputs' } },
		secondSelectedDate: { control: { type: 'text' }, table: { type: { summary: 'D' }, category: 'inputs' } },
		startOn: {
			control: { type: 'text' },
			description: 'Date affichée par le sélecteur en l’absence de valeur. Par défaut : aujourd’hui.',
			table: { category: 'inputs' },
		},
		min: { control: { type: 'text' }, description: 'Date minimale sélectionnable.', table: { category: 'inputs' } },
		max: { control: { type: 'text' }, description: 'Date maximale sélectionnable.', table: { category: 'inputs' } },
		granularity: {
			options: Object.values(ELuDateGranularity),
			control: { type: 'select' },
			description: 'Granularité de la valeur sélectionnée.',
			table: { category: 'inputs', defaultValue: { summary: 'day' } },
		},
		hideClearer: {
			control: { type: 'boolean' },
			description: 'Masque le bouton de suppression de la valeur.',
			table: { category: 'inputs' },
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Texte affiché en l’absence de valeur.',
			table: { category: 'inputs' },
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Désactive le champ.',
			table: { category: 'inputs' },
		},
		pickerOverlap: {
			control: { type: 'boolean' },
			description: 'Affiche le sélecteur de date par-dessus le champ (déjà activé à l’initialisation par <code>lu-date-select</code>).',
			table: { category: 'inputs' },
		},
		// Inherited from lu-select, meaningless for a date select
		multiple: { table: { disable: true } },
	},
});

const description = `Avant d'utiliser ce composant, il faut fournir un \`ALuDateAdapter\` parmis ceux fournis (\`LuNativeDateAdapter\`, \`LuStringDateAdapter\`).
De plus, \`provideAnimations\` est également requis.

${generateMarkdownCodeBlock(
	'ts',
	`
import { provideAnimations } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';

@NgModule({
	providers: [provideAnimations(), { provide: ALuDateAdapter, useClass: LuStringDateAdapter }]
})
class MyModule {}
`,
)}
`;

export const Select = generateStory({
	name: 'Select',
	description,
	template: `
<label class="textfield">
	<lu-date-select class="textfield-input"
		[(ngModel)]="selectedDate"
		[granularity]="granularity"
		[min]="min"
		[max]="max"
		[placeholder]="placeholder"
		[startOn]="startOn"
		[disabled]="disabled"
		[hideClearer]="hideClearer"
		[pickerOverlap]="pickerOverlap"
	></lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
});

export const Minimal = generateStory({
	name: 'Minimal',
	description: '',
	template: `
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate" />
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
});

export const DualSelect = generateStory({
	name: 'Dual select',
	description: '',
	template: `
<label class="textfield">
	<lu-date-select class="textfield-input"
		[(ngModel)]="selectedDate"
		[max]="secondSelectedDate"
		[placeholder]="secondSelectedDate ? 'max : ' + secondSelectedDate : undefined"
	></lu-date-select>
	<span class="textfield-label">Start</span>
</label>
<label class="textfield">
	<lu-date-select class="textfield-input"
		[(ngModel)]="secondSelectedDate"
		[min]="selectedDate"
		[startOn]="selectedDate"
		[placeholder]="selectedDate ? 'min : ' + selectedDate : undefined"
	></lu-date-select>
	<span class="textfield-label">End</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
});

export const SelectWithDisplayer = generateStory({
	name: 'SelectWithDisplayer',
	description: 'Il est possible de modifier l’affichage de la valeur courant à l’aide d’un `luDisplayer` personnalisé.',
	template: `
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate">
		<ng-container *luDisplayer="let value">Birthday: {{ value | date : 'longDate' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/input': ['LuInputDisplayerDirective'],
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
});

export const SelectMonthWithDisplayer = generateStory({
	name: 'SelectMonthWithDisplayer',
	description: 'Il est possible de modifier l’affichage de la valeur courant à l’aide d’un `luDisplayer` personnalisé.',
	template: `
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate" [granularity]="granularity">
		<ng-container *luDisplayer="let value">start of {{ value | date : 'MM/yyyy' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/input': ['LuInputDisplayerDirective'],
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
	storyPartial: {
		args: {
			granularity: ELuDateGranularity.month,
		},
	},
});

const today = new LuStringDateAdapter('en').forgeToday();

const meta: Meta<StoryComponent> = {
	title: 'Documentation/Forms/Date/Select',
	component: LuDateSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [LuDateSelectInputComponent, FormsModule, LuInputDisplayerDirective],
			providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }],
		}),
		applicationConfig({ providers: [provideAnimations()] }),
	],
	args: {
		granularity: ELuDateGranularity.day,
		hideClearer: false,
		placeholder: '',
		disabled: false,
		pickerOverlap: false,
		selectedDate: today,
		secondSelectedDate: today,
		startOn: today,
	},
	parameters: {
		docs: useDocumentationStory(Select),
	},
};

export default meta;
