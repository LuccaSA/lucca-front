/**
 * Available SoftwareIconComponent Types
 */

export const SOFTWARE_ICON_SIZE = ['XXS', 'XS', 'S', 'L'] as const;
export type SoftwareIconSize = (typeof SOFTWARE_ICON_SIZE)[number];

export const SOFTWARE_ICON = [
	// Time and Activities
	'absences',
	'timesheet',
	'office',
	'projects',
	'shifts',
	// Talent Management
	'performance',
	'engagement',
	'training',
	'recruitment',
	'mood',
	// Employee Administration
	'analytics',
	'employee-administration',
	'shared-documents',
	'faces',
	// Spend Management
	'business-expenses',
	'invoices',
	'payment-methods',
	'accounting-assistant',
	'certified-einvoicing-platform',
	// Compensation and Benefits
	'compensation',
	'payslip',
	'benefits',
	'payroll-assistant',
	// Lucca

	'administration',
	'cloud-control',
	'lucca',
] as const;

export type SoftwareIcon = (typeof SOFTWARE_ICON)[number];
