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

export type SoftwareIcon = (typeof SoftwareIconList)[number];
