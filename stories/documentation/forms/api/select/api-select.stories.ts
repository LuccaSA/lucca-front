import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'api-select-story',
	standalone: true,
	imports: [LuApiSelectInputComponent],
	template: `
		<label class="textfield">
			<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield pr-u-marginTopL">
			<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position"> </lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>

		<label class="textfield pr-u-marginTopL">
			<lu-api-select class="textfield-input" [disabled]="true" standard="v4" [api]="apiV4" sort="job.name,level.position"> </lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>
	`,
})
class ApiSelectStory {
	apiV3 = '/api/v3/axisSections';
	apiV4 = '/organization/structure/api/job-qualifications';
}

export default {
	title: 'Documentation/Forms/Api/Select',
	component: ApiSelectStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const Template: StoryFn<ApiSelectStory> = (args) => ({
	props: args,
});

const code = `
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';

@Component({
	selector: 'api-select-story',
	standalone: true,
	imports: [LuApiSelectInputComponent],
	template: \`
		<label class="textfield">
			<lu-api-select class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield pr-u-marginTopL">
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

export const Basic = Template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
