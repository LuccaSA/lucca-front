import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILuSidepanelContent, LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'sidepanel-content',
	template: '<p>General Kenobi</p>'
})
class SidepanelContentComponent implements ILuSidepanelContent {
	title = 'Hello there';
	submitAction = () => { };
}

@Component({
	selector: 'sidepanel-stories',
	templateUrl: './sidepanel.stories.html',
}) class SidePanelStories {
	constructor(
		private sidepanelFactory: LuSidepanel
	) { }

	public openSidepanel() {
		this.sidepanelFactory.open(SidepanelContentComponent).onClose.subscribe();
	}
}

export default {
  title: 'NG/Sidepanel',
  component: SidePanelStories,
	decorators: [
		moduleMetadata({
			declarations: [
				SidepanelContentComponent
			],
			entryComponents: [SidePanelStories],
			imports: [
				LuSidepanelModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<SidePanelStories> = (args: SidePanelStories) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}