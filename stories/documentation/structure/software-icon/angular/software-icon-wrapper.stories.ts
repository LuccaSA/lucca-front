import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperComponent } from '@lucca-front/ng/software-icon-wrapper';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Software Icon Wrapper',
	component: SoftwareIconWrapperComponent,
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconWrapperComponent, SoftwareIconComponent],
		}),
	],
	argTypes: {
		max: {
			control: {
				type: 'number',
				min: 0,
			},
			description: "Nombre maximum d'icônes à afficher. Les icônes supplémentaires sont cachées.",
		},
		size: {
			options: ['XXS', 'XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille de toute la liste.',
		},
	},
} as Meta;

export const Basic: StoryObj<SoftwareIconWrapperComponent> = {
	args: {
		max: 3,
	},
	render: (args) => ({
		props: {
			...args,
			icons: SoftwareIconList,
		},
		template: `
			<lu-software-icon-wrapper [max]="max" [size]="size">
				<li><lu-software-icon icon="analytics" /></li>
				<li><lu-software-icon icon="ask-lucca" /></li>
				<li><lu-software-icon icon="office" /></li>
				<li><lu-software-icon icon="absences" /></li>
				<li><lu-software-icon icon="lucca" /></li>
				<li><lu-software-icon icon="analytics" /></li>
				<li><lu-software-icon icon="mood" /></li>
				<li><lu-software-icon icon="client-center" /></li>
				<li><lu-software-icon icon="cloud-control" /></li>
				<li><lu-software-icon icon="engagement" /></li>
				<li><lu-software-icon icon="timesheet" /></li>
				<li><lu-software-icon icon="compensation" /></li>
			</lu-software-icon-wrapper>
		`,
	}),
};
