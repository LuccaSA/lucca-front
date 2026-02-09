export const SoftwareIconList = [
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
] as const;

export type SoftwareIcon = (typeof SoftwareIconList)[number];
