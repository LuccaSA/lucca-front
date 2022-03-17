import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'modal-content',
	template: '<p>General Kenobi</p>'
})
class ModalContentComponent implements ILuModalContent {
	title = 'Hello there';
	submitAction = () => {};
}

@Component({
	selector: 'modal-stories',
	templateUrl: './modal.stories.html',
}) class ModalStories {
	constructor(
		private modalFactory: LuModal
	) { }

	public openModal() {
		this.modalFactory.open(ModalContentComponent).onClose.subscribe();
	}
}

export default {
  title: 'Documentation/Overlays/Modal',
  component: ModalStories,
	decorators: [
		moduleMetadata({
			declarations: [
				ModalContentComponent
			],
			entryComponents: [ModalStories],
			imports: [
				LuModalModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<ModalStories> = (args: ModalStories) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}
