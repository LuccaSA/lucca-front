import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, ELuDateGranularity, LuStringDateAdapter } from '@lucca-front/ng/core';
import { LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { Meta, moduleMetadata } from '@storybook/angular';
import { generateMarkdownCodeBlock, getStoryGenerator, useDocumentationStory } from 'stories/helpers/stories';

type StoryComponent = LuDateSelectInputComponent<string> & { selectedDate: string };

const generateStory = getStoryGenerator<StoryComponent>({
	argTypes: {
		selectedDate: { control: { type: 'text' }, table: { type: { summary: 'D' } } },
		startOn: { control: { type: 'text' } },
		min: { control: { type: 'text' } },
		max: { control: { type: 'text' } },
		multiple: { control: false },
	},
});

const description = `Avant d'utiliser ce composant, il faut fournir un \`ALuDateAdapter\` parmis ceux fournis (\`LuNativeDateAdapter\`, \`LuStringDateAdapter\`).
De plus, \`BrowserAnimationsModule\` est également requis.

${generateMarkdownCodeBlock(
	'ts',
	`
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';

@NgModule({
	imports: [BrowserAnimationsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }]
})
class MyModule {}
`,
)}
`;

export const Select = generateStory(
	'Select',
	description,
	`
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
	{
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
);

export const Minimal = generateStory(
	'Minimal',
	'',
	`
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate"></lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
);

export const SelectWithDisplayer = generateStory(
	'SelectWithDisplayer',
	"Il est possible de modifier l'affichage de la valeur courant à l'aide d'un `luDisplayer` personnalisé.",
	`
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate">
		<ng-container *luDisplayer="let value">Birthday: {{ value | date : 'LL' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/input': ['LuInputDisplayerDirective'],
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
);

export const SelectMonthWithDisplayer = generateStory(
	'SelectMonthWithDisplayer',
	"Il est possible de modifier l'affichage de la valeur courant à l'aide d'un `luDisplayer` personnalisé.",
	`
<label class="textfield">
	<lu-date-select class="textfield-input" [(ngModel)]="selectedDate" [granularity]="granularity">
		<ng-container *luDisplayer="let value">start of {{ value | date : 'MM/YYYY' }}</ng-container>
	</lu-date-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/input': ['LuInputDisplayerDirective'],
		'@lucca-front/ng/date': ['LuDateSelectInputComponent'],
	},
	{
		args: {
			granularity: ELuDateGranularity.month,
		},
	},
);

const today = new LuStringDateAdapter('en').forgeToday();

const meta: Meta<StoryComponent> = {
	title: 'Documentation/Forms/Date/Select',
	component: LuDateSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [LuDateSelectInputComponent, BrowserAnimationsModule, FormsModule, LuInputDisplayerDirective],
			providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }],
		}),
	],
	args: {
		granularity: ELuDateGranularity.day,
		selectedDate: today,
		startOn: today,
	},
	parameters: {
		docs: useDocumentationStory(Select),
	},
};

export default meta;
