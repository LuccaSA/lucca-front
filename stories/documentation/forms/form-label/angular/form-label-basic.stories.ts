import { LOCALE_ID } from '@angular/core';
import { FORM_LABEL_SIZE, FormLabelComponent } from '@lucca-front/ng/form-label';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

interface FormLabelBasicStory {
	for: string;
	required: boolean;
	tooltip: string;
	tag: string;
	size: string;
	counterMax: number;
	counterStatus: number;
	counterId: string;
	labelId: string;
	error: boolean;
}

export default {
	title: 'Documentation/Forms/Form Label/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FormLabelComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		size: {
			options: setStoryOptions(FORM_LABEL_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		counterStatus: {
			if: { arg: 'counterMax', truthy: true },
			control: {
				min: 0,
				step: 1,
			},
			description: 'Nombre de caractères actuellement saisis.',
		},
		counterId: {
			if: { arg: 'counterMax', truthy: true },
		},
		labelId: {
			if: { arg: 'counterMax', truthy: true },
		},
		counterMax: {
			control: {
				min: 0,
				step: 1,
			},
			description: 'Définit la valeur maximale du compteur de caractères.',
		},
		for: {
			description: 'ID du champ de formulaire associé au label.',
		},
		tooltip: {
			description: 'Affiche une icône (?) associée à une info-bulle.',
		},
		tag: {
			description: 'Ajoute un tag associé au label.',
		},
		required: {
			description: 'Marque le champ comme obligatoire.',
		},
		error: {
			description: 'Applique l’état d’erreur au label.',
		},
	},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	const requiredAttr = args.required ? ` required` : ``;
	const tooltipAttr = args.tooltip ? ` tooltip="${args.tooltip}"` : ``;
	const tagAttr = args.tag ? ` tag="${args.tag}"` : ``;
	const sizeAttr = args.size ? ` size="${args.size}"` : ``;
	const counterMaxAttr = args.counterMax > 0 ? ` counterMax="${args.counterMax}"` : ``;
	const counterStatusAttr = args.counterMax > 0 ? ` counterStatus="${args.counterStatus}"` : ``;
	const counterIdAttr = args.counterMax > 0 ? ` counterId="${args.counterId}"` : ``;
	const labelIdAttr = args.counterMax > 0 ? ` labelId="${args.labelId}"` : ``;
	const errorAttr = args.error ? ` error` : ``;

	return `<label luFormLabel for="${args.for}"${tooltipAttr}${tagAttr}${sizeAttr}${counterMaxAttr}${counterStatusAttr}${counterIdAttr}${labelIdAttr}${requiredAttr}${errorAttr}>Label</label>`;
}

const Template = (args: FormLabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FormLabelBasicStory> = {
	args: {
		for: 'inputID',
		tooltip: '',
		tag: '',
		required: false,
		size: '',
		counterMax: 0,
		counterStatus: 0,
		counterId: 'counterID',
		labelId: 'labelID',
		error: false,
	},
	render: Template,
};
