import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SoftwareIconBasicStory {
	icon: string;
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Structure/Software icon/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {
		icon: {
			options: ['compensation'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['XXS', 'XS', 'S', '', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: ['', 'neutral'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: SoftwareIconBasicStory): string {
	const palette = args.palette === '' ? `` : ` palette-${args.palette}`;
	const size = args.size === '' ? `` : ` mod-${args.size}`;
	const domain = 'https://tmp.vincent-valentin.name';
	const path = '/lucca/software-icon/';
	const extension = '.svg';
	return `<div class="softwareIcon${palette}${size}" aria-hidden="true" [innerHtml]="'${domain}${path}${args.icon}${extension}' | luSafeExternalSvg"></div>`;
}

const Template = (args: SoftwareIconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<SoftwareIconBasicStory> = {
	args: {
		icon: 'compensation',
		palette: '',
		size: '',
	},
	render: Template,
};
