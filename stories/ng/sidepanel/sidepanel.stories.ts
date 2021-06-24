import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'sidepanel-content',
	template: `i am a sidepanel`
}) class SidepanelContent {
	title ='look at me !'
	submitAction(): void {}
}
@Component({
	selector: 'sidepanel-stories',
	template: `<button class="button" (click)="openSidepanel()">click me</button>`,
}) class SidepanelStory {
	@Input() position: 'left' | 'right' | 'top' | 'bottom';
	constructor(private _sp: LuSidepanel) {}

	openSidepanel(): void {
		this._sp.open(SidepanelContent, undefined, { position: this.position ?? 'right' });
	}
}

export default {
  title: 'NG/Sidepanel',
  component: SidepanelStory,
	argTypes: {
		position: {
			control: {
				type: 'radio',
				options: ['top', 'left', 'right', 'bottom']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [SidepanelStory],
			declarations: [SidepanelContent],
			imports: [
				LuSidepanelModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<SidepanelStory> = (args: SidepanelStory) => ({
  props: args,
});

export const basic = template.bind({});
basic.args = {
	position: 'right'
}