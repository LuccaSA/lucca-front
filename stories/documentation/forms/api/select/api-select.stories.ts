import { Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LuApiModule } from "@lucca-front/ng/api";
import { Meta, moduleMetadata, Story } from "@storybook/angular";

@Component({
	selector: 'api-select-stories',
	templateUrl: './api-select.stories.html',
}) class ApiStory {}

export default {
	title: 'Documentation/Forms/Api/Select',
	component: ApiStory,
	decorators: [
		moduleMetadata({
			imports: [
				LuApiModule,
				BrowserAnimationsModule,
			],
		})
	]
} as Meta;

const template: Story<ApiStory> = (args: ApiStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}
