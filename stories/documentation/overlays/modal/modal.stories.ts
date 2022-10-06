import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { map, shareReplay, timer } from 'rxjs';

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>General Kenobi</p>'
})
class ModalContentComponent implements ILuModalContent {
	title = 'Hello there'
	submitAction = () => {};
}

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>General Kenobi</p>'
})
class ModalDynamicContentComponent implements ILuModalContent {
	counter$ = timer(0, 1000).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

	title = this.counter$.pipe(map(n => `Title #${n}`));
	submitLabel = this.counter$.pipe(map(n => `Submit #${n}`));
	cancelLabel = this.counter$.pipe(map(n => `Cancel #${n}`));
	submitCounter = this.counter$;
	submitDisabled = this.counter$.pipe(map(n => n % 2 === 0));

	submitAction = () => {};
}

@Component({
	selector: 'modal-stories',
	template: `
		<button type="button" class="button" (click)="openModal()">Open modal</button>
		<button type="button" class="button" (click)="openDynamicContentModal()">Open dynamic modal</button>
	`,
}) class ModalStories {
	constructor(
		private modal: LuModal
	) { }

	public openModal() {
		this.modal.open(ModalContentComponent);
	}

	public openDynamicContentModal() {
		this.modal.open(ModalDynamicContentComponent);
	}
}

export default {
	title: 'Documentation/Overlays/Modal',
	component: ModalStories,
	decorators: [
		moduleMetadata({
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
			type: 'code',
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
