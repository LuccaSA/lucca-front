import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'api-select-story',
	imports: [LuApiSelectInputComponent],
	template: `
		<label class="textfield">
			<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3" />
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield pr-u-marginBlockStart300">
			<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position" />
			<span class="textfield-label">Api V4 Select</span>
		</label>

		<label class="textfield pr-u-marginBlockStart300">
			<lu-api-select class="textfield-input" [disabled]="true" standard="v4" [api]="apiV4" sort="job.name,level.position" />
			<span class="textfield-label">Api V4 Select</span>
		</label>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ApiSelectStory {
	apiV3 = '/api/v3/axisSections';
	apiV4 = '/organization/structure/api/job-qualifications';
}

export default {
	title: 'Documentation/Forms/Api/Select/Angular/Basic',
	component: ApiSelectStory,
	// Documentation only: the inputs are set in the template of the wrapper component, they can't be changed from the Controls panel.
	argTypes: {
		standard: {
			options: ['v3', 'v4'],
			control: false,
			description: 'Standard de l’API Lucca interrogée.',
			table: { category: 'inputs', type: { summary: "'v3' | 'v4'" }, defaultValue: { summary: 'v3' } },
		},
		api: {
			control: false,
			description: 'URL de l’API interrogée.',
			table: { category: 'inputs', type: { summary: 'string' } },
		},
		fields: {
			control: false,
			description: 'Champs récupérés. Fonctionne uniquement avec <code>standard="v3"</code>.',
			table: { category: 'inputs', type: { summary: 'string' } },
		},
		filters: {
			control: false,
			description: 'Filtres ajoutés à la requête envoyée à l’API.',
			table: { category: 'inputs', type: { summary: 'string[]' } },
		},
		orderBy: {
			control: false,
			description: 'Tri des résultats. Fonctionne uniquement avec <code>standard="v3"</code>, sinon utiliser <code>sort</code>.',
			table: { category: 'inputs', type: { summary: 'string' } },
		},
		sort: {
			control: false,
			description: 'Tri des résultats. Fonctionne uniquement avec <code>standard="v4"</code>, sinon utiliser <code>orderBy</code>.',
			table: { category: 'inputs', type: { summary: 'string' } },
		},
	},
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const Template = (args: ApiSelectStory) => ({
	props: args,
});

const code = `
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';

@Component({
	selector: 'api-select-story',
	imports: [LuApiSelectInputComponent],
	template: \`
		<label class="textfield">
			<lu-api-select class="textfield-input" [api]="apiV3" />
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield pr-u-marginBlockStart300">
			<lu-api-select class="textfield-input"
				standard="v4"
				[api]="apiV4"
				sort="job.name,level.position">
			</lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>
	\`
})
class ApiSelectStory {
	apiV3 = '/api/v3/axisSections'
	apiV4 = '/organization/structure/api/job-qualifications'
}`;

export const Basic: StoryObj<ApiSelectStory> = {
	args: {},
	render: Template,
};
Basic.parameters = {
	// Hide the properties of the wrapper component, only the documented inputs of lu-api-select are listed
	controls: { include: ['standard', 'api', 'fields', 'filters', 'orderBy', 'sort'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
