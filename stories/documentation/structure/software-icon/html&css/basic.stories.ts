import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SOFTWARE_ICON_SIZE, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

interface SoftwareIconBasicStory {
	icon: string;
	disabled: boolean;
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
			options: SoftwareIconList,
			control: {
				type: 'select',
			},
			description: "Modifie l'icône produit.",
		},
		size: {
			options: setStoryOptions(SOFTWARE_ICON_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
		disabled: {
			description: 'Marque le produit comme inactif.',
		},
	},
} as Meta;

function getTemplate(args: SoftwareIconBasicStory): string {
	const disabled = args.disabled ? ` is-disabled` : ``;
	const size = args.size === '' ? `` : ` mod-${args.size}`;
	const domain = 'https://cdn.lucca.fr';
	const path = '/transverse/prisme/visuals/software-icon/';
	const extension = '.svg';
	return `<div class="softwareIcon${disabled}${size}" aria-hidden="true" [innerHtml]="'${domain}${path}${args.icon}${extension}' | luSafeExternalSvg"></div>`;
}

const Template = (args: SoftwareIconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<SoftwareIconBasicStory> = {
	args: {
		icon: 'absences',
		disabled: false,
		size: '',
	},
	render: Template,
};
