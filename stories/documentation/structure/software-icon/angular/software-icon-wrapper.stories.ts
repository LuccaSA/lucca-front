import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperButtonMoreComponent, SoftwareIconWrapperComponent } from '@lucca-front/ng/software-icon-wrapper';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PopoverDirective } from '@lucca-front/ng/popover2/popover.directive';

export default {
	title: 'Documentation/Structure/Software icon/Angular/Software Icon Wrapper',
	component: SoftwareIconWrapperComponent,
	decorators: [
		moduleMetadata({
			imports: [SoftwareIconWrapperComponent, SoftwareIconComponent, SoftwareIconWrapperButtonMoreComponent, PopoverDirective],
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
			options: ['XXS', 'XS', 'S', 'L', ''],
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
				@for (icon of icons; track icon) {
					<lu-software-icon [icon]="icon" />
				}
			</lu-software-icon-wrapper>
		`,
	}),
};

export const WithActionMore: StoryObj<SoftwareIconWrapperComponent> = {
	args: {
		max: 3,
	},
	render: (args) => ({
		props: {
			...args,
			icons: ['absences', 'timesheet', 'office', 'projects', 'shifts', 'lucca'],
		},
		template: `
			<lu-software-icon-wrapper [max]="max">
				@for (icon of icons; track icon) {
					<lu-software-icon [icon]="icon" />
				}
				<button luSoftwareIconWrapperButton #wrapperButton [luPopover2]="softIconsWrapperPopover" luPopoverTrigger="hover+focus">
				</button>
				<ng-template #softIconsWrapperPopover>
					<div class="popover-contentOptional">
						@for (icon of wrapperButton.hiddenIcons(); track $index) {
							<lu-software-icon [icon]="icon.icon()" />
						}
					</div>
				</ng-template>
			</lu-software-icon-wrapper>
		`,
	}),
};
