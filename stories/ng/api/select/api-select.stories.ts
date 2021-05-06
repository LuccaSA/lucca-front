import { Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ALuApiService, LuApiModule } from "@lucca-front/ng/api";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { FakeLuApiService } from "../api.mock";

@Component({
	selector: 'api-select-stories',
	templateUrl: './api-select.stories.html',
}) class ApiStory {}

export default {
	title: 'NG/Api/Select',
	component: ApiStory,
	decorators: [
		moduleMetadata({
			imports: [
				LuApiModule,
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: ALuApiService, useClass: FakeLuApiService }
			]
		})
	]
} as Meta;

const template: Story<ApiStory> = (args: ApiStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}
