import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
			options: [
				// Time and Activities
				'absences',
				'timesheet',
				'office',
				'projects',
				'planning',
				// Talent Management
				'perfomance',
				'engagement',
				'training',
				'recruitment',
				// Employee Administration
				'analytics',
				'employee-administration',
				'shared-documents',
				// Spend Management
				'business-expenses',
				'invoices',
				'payment-methods',
				'accounting-assistant',
				// Compensation and Benefits
				'compensation',
				'payslip',
				'benefits',
				'payroll-assistant',
				// Lucca
				'mood',
				'faces',
				'administration',
				'cloud-control',
				'lucca',
			],
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
