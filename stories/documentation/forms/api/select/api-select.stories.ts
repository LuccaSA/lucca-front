import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'api-select-story',
	standalone: true,
	imports: [LuApiSelectInputComponent],
	template: `
		<label class="textfield">
			<lu-api-select data-testid="lu-select" class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield u-marginTopM">
			<lu-api-select class="textfield-input" standard="v4" [api]="apiV4" sort="job.name,level.position"> </lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>

		<label class="textfield u-marginTopM">
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
	decorators: [
		moduleMetadata({
			imports: [HttpClientModule, BrowserAnimationsModule],
		}),
	],
} as Meta;

const Template: Story<ApiSelectStory> = (args: ApiSelectStory) => ({
	props: args,
});

const code = `
/* 1. Importer LuApiSelectInputComponent */
import { LuApiSelectInputComponent } from '@lucca-front/ng/api';

@NgModule({
	imports: [LuApiSelectInputComponent]
})
class ApiSelectStoriesModule {}

/* 2. Utiliser lu-api-select */
@Component({
	selector: 'api-select-story',
	template: \`
		<label class="textfield">
			<lu-api-select class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield u-marginTopM">
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
