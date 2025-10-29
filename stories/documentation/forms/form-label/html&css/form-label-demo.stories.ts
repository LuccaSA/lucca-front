import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FormLabelDemoStory {
	required: boolean;
	infos: string;
	infosIconAlt: string;
	tag: string;
	counterMax: number;
	count: number;
	label: string;
	counterAlt: string;
	critical: boolean;
	size: string;
	fullSize: boolean;
	disabled: boolean;
	id: string;
	for: string;
	counterId: string;
}

export default {
	title: 'Documentation/Forms/Form Label Demo/HTML&CSS',

	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],

	render: (args: FormLabelDemoStory) => {
		const requiredContent = args.required ? `<sup class="formLabelDemo-required" aria-hidden="true">*</sup>` : ``;
		const sizeClass = args.size !== `` ? ` mod-${args.size}` : ``;
		const infosContent =
			args.infos !== ''
				? `
	<span class="formLabelDemo-infos" luTooltip="${args.infos}">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">${args.infosIconAlt}</span>
	</span>`
				: ``;
		const tagContent =
			args.tag !== ``
				? `
	<span class="tag">${args.tag}</span>`
				: ``;
		const counterIdAttr = args.counterId ? ` id="${args.counterId}"` : ``;
		const counterContent =
			args.counterMax > 0
				? `
	<span class="formLabelDemo-counter" aria-live="polite"${counterIdAttr}>
		<span aria-hidden="true">${args.count}/${args.counterMax}</span>
		<span class="pr-u-mask">${args.counterAlt.replace('#counterMax#', args.counterMax.toString()).replace('#count#', args.count.toString())}</span>
	</span>`
				: ``;
		const criticalClass = args.critical ? ` is-critical` : ``;
		const fullSizeClass = args.fullSize ? ` mod-fullSize` : ``;
		const disabledClass = args.disabled ? ` is-disabled` : ``;
		const idAttr = args.id ? ` id="${args.id}"` : ``;
		const forAttr = args.for ? ` for="${args.for}"` : ``;
		return {
			template: `<label class="formLabelDemo${criticalClass}${sizeClass}${fullSizeClass}${disabledClass}">
	${args.label}${requiredContent}${infosContent}${tagContent}${counterContent}
</label>`,
		};
	},
} as Meta;

export const Template: StoryObj = {
	argTypes: {
		size: {
			options: ['', 'S', 'XS'],
			control: {
				type: 'select',
			},
		},
		counterAlt: {
			if: { arg: 'counterMax', truthy: true },
		},
		count: {
			if: { arg: 'counterMax', truthy: true },
		},
		counterId: {
			if: { arg: 'counterMax', truthy: true },
		},
		fullSize: {
			if: { arg: 'counterMax', truthy: false },
		},
		infosIconAlt: {
			if: { arg: 'infos', truthy: true },
		},
	},

	args: {
		id: '',
		for: 'idInput',
		critical: false,
		size: '',
		label: 'Lorem ipsum dolor',
		required: false,
		infos: '',
		infosIconAlt: 'Plus d’informations',
		tag: '',
		counterMax: 0,
		count: 8,
		counterAlt: `Votre contenu fait #count# caractères de long. #counterMax# maximum sont autorisés.`,
		counterId: 'idCounter',
		fullSize: false,
		disabled: false,
	},
};
