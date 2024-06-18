import { Component, inject, Input, Type } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ILuModalContent, LU_MODAL_DATA, LuModal, LuModalConfig, LuModalModule } from '@lucca-front/ng/modal';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { map, shareReplay, timer } from 'rxjs';
import { generateMarkdownCodeBlock, getStoryGenerator, useDocumentationStory } from 'stories/helpers/stories';

type StoryComponent = LuModalConfig & { useDynamicContent: boolean; message: string };

// We have to cast as any to make this
const globalArgTypes: any = {
	mode: {
		options: ['modal', 'sidepanel'],
		control: {
			type: 'select',
		},
	},
	panelClass: { control: { type: 'text' } },
	undismissable: { control: { type: 'boolean' } },
	size: {
		options: ['XS', 'S', 'M', 'L', 'XL'],
		control: {
			type: 'select',
		},
	},
	noBackdrop: { control: { type: 'boolean' } },
} as const;

const generateStory = getStoryGenerator<StoryComponent>({
	argTypes: globalArgTypes,
});

const description = `Le service \`LuModal\` permet d'afficher un composant dans une modale. Le composant doit implémenter \`ILuModalContent\`.

${generateMarkdownCodeBlock(
	'ts',
	`
import { ILuModalContent } from '@lucca-front/ng/modal';

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>General Kenobi</p>',
})
class ModalContentComponent implements ILuModalContent {
	title = 'Hello there';
	submitAction = () => {};
}
`,
)}
`;

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>{{ message }}</p>',
})
class ModalContentComponent implements ILuModalContent {
	title = 'Hello there';
	message = inject<{ message: string }>(LU_MODAL_DATA)?.message ?? 'General Kenobi';
	submitAction = () => {};
}

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>General Kenobi</p>',
})
class ModalDynamicContentComponent implements ILuModalContent {
	counter$ = timer(0, 1000).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

	title = this.counter$.pipe(map((n) => `Title #${n}`));
	submitLabel = this.counter$.pipe(map((n) => `Submit #${n}`));
	cancelLabel = this.counter$.pipe(map((n) => `Cancel #${n}`));
	submitCounter = this.counter$;
	submitDisabled = this.counter$.pipe(map((n) => n % 2 === 0));

	submitAction = () => {};
}

@Component({
	selector: 'modal-stories',
	standalone: true,
	template: `
		<lu-toasts [sources]="[]"></lu-toasts>
		<button type="button" luButton (click)="openModal()">Open</button>
	`,
	imports: [LuToastsModule, ButtonComponent],
})
class ModalStories {
	@Input() mode: 'modal' | 'sidepanel' = 'modal';
	@Input() position: 'left' | 'right' = 'right';
	@Input() panelClass: string;
	@Input() undismissable: boolean;
	@Input() size: 'XS' | 'S' | 'M' | 'L' | 'XL' = 'M';
	@Input() noBackdrop: boolean;

	@Input() useDynamicContent: boolean;
	@Input() message: string;

	constructor(
		private modal: LuModal,
		private toastsService: LuToastsService,
	) {}

	public openModal() {
		const cmp: Type<ILuModalContent> = this.useDynamicContent ? ModalDynamicContentComponent : ModalContentComponent;
		const baseOptions = {
			...(this.panelClass ? { panelClass: this.panelClass } : {}),
			size: this.size ?? 'M',
			noBackdrop: this.noBackdrop ?? false,
			undismissable: this.undismissable ?? false,
		};
		const options =
			this.mode === 'sidepanel'
				? {
						...baseOptions,
						position: this.position,
						mode: this.mode,
					}
				: baseOptions;
		const data = this.message ? { message: this.message } : {};

		const ref = this.modal.open(cmp, data, options);

		if (this.undismissable) {
			ref.onBackdropClick.subscribe(() => {
				this.toastsService.addToast({
					message: 'Backdrop clicked',
				});
			});
		}
	}
}

const template = `<modal-stories [mode]="mode" [position]="position" [panelClass]="panelClass" [undismissable]="undismissable" [size]="size" [noBackdrop]="noBackdrop" [useDynamicContent]="useDynamicContent" [message]="message"></modal-stories>`;

export const Modal = generateStory({
	name: 'Basic',
	description,
	code: `this.modal.open(ModalContentComponent, {}, { mode, panelClass, undismissable, size, noBackdrop });`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal', 'LU_MODAL_DATA'],
	},
});

const withDataDescription = `Il est possible de passer des données au composant affiché dans la modale. Pour cela, il faut passer un objet en deuxième paramètre de la méthode \`open\`. Ce paramètre sera injecté dans le composant affiché dans la modale.

${generateMarkdownCodeBlock(
	'ts',
	`
import { ILuModalContent, LU_MODAL_DATA } from '@lucca-front/ng/modal';

export interface MyModalData {
	message: string;
}

@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>{{data.message}}</p>',
})
class MyModalComponent implements ILuModalContent {
	data = inject<MyModalData>(LU_MODAL_DATA);
}
`,
)}
`;

export const ModalWithData = generateStory({
	name: 'With data',
	description: withDataDescription,
	code: `const data: MyModalData = { message: 'Hello' };
this.modal.open(ModalContentComponent, data);`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			message: 'Hello',
		},
	},
});

export const ModalSidepanelMode = generateStory({
	name: 'Sidepanel mode',
	description: `Il est possible d'afficher la modale en mode sidepanel. Pour cela, il faut passer l'option \`mode: 'sidepanel'\` dans le troisième paramètre de la méthode \`open\`. Il est également possible de choisir le côté d'affichage du sidepanel avec l'option \`position: 'left' | 'right'\`.`,
	code: `this.modal.open(ModalContentComponent, {}, { mode: 'sidepanel' });`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			mode: 'sidepanel',
			position: 'right',
		},
		argTypes: {
			mode: { table: { disable: true } },
		},
	},
});

export const ModalSize = generateStory({
	name: 'Size',
	description: `Il est possible de choisir la taille de la modale avec l'option \`size: 'XS' | 'S' | 'M' | 'L' | 'XL'\`.`,
	code: `this.modal.open(ModalContentComponent, {}, { size: 'XL' });`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			size: 'XL',
		},
		argTypes: {
			size: globalArgTypes.size,
		},
	},
});

export const DynamicModalContent = generateStory({
	name: 'Dynamic content',
	description: `Les différents champs de la modale peuvent être \`Observable\`. Par exemple :
${generateMarkdownCodeBlock(
	'ts',
	`
@Component({
	selector: 'modal-content',
	standalone: true,
	template: '<p>General Kenobi</p>',
})
class ModalDynamicContentComponent implements ILuModalContent {
	counter$ = timer(0, 1000).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

	title = this.counter$.pipe(map((n) => \`Title #\${n}\`));
	submitLabel = this.counter$.pipe(map((n) => \`Submit #\${n}\`));
	cancelLabel = this.counter$.pipe(map((n) => \`Cancel #\${n}\`));
	submitCounter = this.counter$;
	submitDisabled = this.counter$.pipe(map((n) => n % 2 === 0));

	submitAction = () => {};
}
`,
)}
`,
	code: `this.modal.open(ModalDynamicContentComponent, {}, { size: 'XL' });`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			useDynamicContent: true,
		},
		argTypes: {
			useDynamicContent: { table: { disable: true } },
		},
	},
});

export const ModalNoBackdrop = generateStory({
	name: 'No backdrop',
	description: `Il est possible de désactiver le backdrop de la modale avec l'option \`noBackdrop: true\`. Dans ce cas, le contenu présent en dessous de la modale reste cliquable.`,
	code: `this.modal.open(ModalContentComponent, {}, { noBackdrop: true });`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			noBackdrop: true,
		},
		argTypes: {
			noBackdrop: { table: { disable: true } },
		},
	},
});

export const ModalUndismissable = generateStory({
	name: 'Undismissable',
	description: `Il est possible de désactiver la possibilité de fermer la modale avec l'option \`undismissable: true\`. Dans ce cas, il faut ajouter un bouton de fermeture dans le contenu de la modale. Il est possible d'écouter les clics sur le backdrop.`,
	code: `const modalRef = this.modal.open(ModalContentComponent, {}, { undismissable: true });
modalRef.backdropClick.subscribe(() => console.log('backdrop clicked'));`,
	codeLang: 'ts',
	template,
	neededImports: {
		'@lucca-front/ng/modal': ['LuModalModule', 'LuModal'],
	},
	storyPartial: {
		args: {
			undismissable: true,
		},
		argTypes: {
			undismissable: { table: { disable: true } },
		},
	},
});

const meta: Meta<StoryComponent> = {
	title: 'Documentation/Overlays/Modal',
	component: ModalStories,
	decorators: [
		applicationConfig({
			providers: [provideAnimations()],
		}),
		moduleMetadata({
			imports: [LuModalModule],
		}),
	],
	args: {},
	parameters: {
		docs: useDocumentationStory(Modal),
	},
};

export default meta;
