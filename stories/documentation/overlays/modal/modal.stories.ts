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
	template: `<button type="button" class="button" (click)="openModal()">Open modal</button>`,
}) class ModalStories {
	constructor(
		private modal: LuModal
	) { }

	public openModal() {
		this.modal.open(ModalContentComponent);
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
			imports: [
				LuModalModule,
				BrowserAnimationsModule,
			]
		})
	],
} as Meta;

const Template: Story<ModalStories> = (args: ModalStories) => ({
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {}
Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			code: `
/* 1. Importer LuModalModule */
import { LuModalModule } from '@lucca-front/ng/modal';

@NgModule({
	imports: [LuModalModule]
})
class ModalStoriesModule {}

/* 2. Créer le composant qui sera inclus dans la modale */
@Component({
	selector: 'modal-content',
	template: '<p>General Kenobi</p>'
})
class ModalContentComponent implements ILuModalContent {
	title = 'Hello there';
	submitAction = () => {};
}

/* 3. Se faire injecter LuModal dans le composant qui déclenche l'ouverture de la modale puis appeler la méthode open() */
@Component({
	selector: 'modal-stories',
	template: \`<button type="button" class="button" (click)="openModal()">Open modal</button>\`,
}) class ModalStories {
	constructor(
		private modal: LuModal
	) { }

	public openModal() {
		this.modal.open(ModalContentComponent);
	}
}`
		}
	}
};
