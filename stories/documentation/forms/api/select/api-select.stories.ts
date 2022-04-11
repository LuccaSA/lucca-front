import { Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LuApiModule, LuApiSelectInputComponent } from "@lucca-front/ng/api";
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from "@storybook/angular";

@Component({
	selector: 'api-select-story',
	template: `
		<label class="textfield">
			<lu-api-select class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield u-marginTopStandard">
			<lu-api-select class="textfield-input"
				standard="v4"
				[api]="apiV4"
				sort="job.name,level.position">
			</lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>
	`
})
class ApiSelectModalStory {
	apiV3 = '/api/v3/axisSections'
	apiV4 = '/organization/structure/api/job-qualifications'
}

export default {
	title: 'Documentation/Forms/Api/Select',
	component: LuApiSelectInputComponent,
	decorators: [
		componentWrapperDecorator(ApiSelectModalStory),
		moduleMetadata({
			declarations: [ApiSelectModalStory],
			imports: [
				LuApiModule,
				BrowserAnimationsModule,
			],
		})
	],
} as Meta;

const Template: Story = props => ({
	props: {
		...props,
		api: '/api/v3/axisSections'
	}
});

export const Basic = Template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code: `
/* 1. Importer LuApiSelectInputModule */
import { LuApiSelectInputModule } from '@lucca-front/ng/api';

@NgModule({
	imports: [LuModalModule]
})
class ModalStoriesModule {}

/* 2. Use it */
@Component({
	selector: 'api-select-story',
	template: \`
		<label class="textfield">
			<lu-api-select class="textfield-input" [api]="apiV3"></lu-api-select>
			<span class="textfield-label">Api V3 Select</span>
		</label>

		<label class="textfield u-marginTopStandard">
			<lu-api-select class="textfield-input"
				standard="v4"
				[api]="apiV4"
				sort="job.name,level.position">
			</lu-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>
	\`
})
class ApiSelectModalStory {
	apiV3 = '/api/v3/axisSections'
	apiV4 = '/organization/structure/api/job-qualifications'
}`
		}
	}
};
