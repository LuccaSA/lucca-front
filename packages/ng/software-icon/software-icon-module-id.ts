import { SoftwareIcon } from './software-icon.type';

/**
 * Software icon of each Lucca application, indexed by its module id.
 * Applications without a dedicated Prisme icon are not listed.
 */
export const SOFTWARE_ICON_BY_MODULE_ID = {
	// Time and Activities
	'timmi-absences': 'absences',
	'timmi-timesheet': 'timesheet',
	'timmi-office': 'office',
	'timmi-project': 'projects',
	'timmi-shift-manager': 'shifts',
	// Talent Management
	'talent-review': 'performance',
	'poplee-engagement': 'engagement',
	'talent-training': 'training',
	'poplee-recruitment': 'recruitment',
	'niko-niko': 'mood',
	// Employee Administration
	analytics: 'analytics',
	'legacy-directory': 'employee-administration',
	directory: 'employee-administration',
	'lucca-documents': 'shared-documents',
	'lucca-faces': 'faces',
	// Spend Management
	'cleemy-expense-reports': 'business-expenses',
	'cleemy-classic': 'business-expenses',
	'cleemy-procurement': 'invoices',
	'cleemy-payment': 'payment-methods',
	'cleemy-banking': 'payment-methods',
	'cleemy-accounting': 'accounting-assistant',
	'cleemy-pdp': 'certified-einvoicing-platform',
	// Compensation and Benefits
	'pagga-remuneration': 'compensation',
	'pagga-payslip': 'payslip',
	'pagga-mealvoucher': 'benefits',
	'pagga-monitor': 'payroll-assistant',
	// Lucca
	'cloud-control': 'cloud-control',
	'ask-lucca': 'ask-lucca',
	calendar: 'calendar',
	'client-center': 'client-center',
	'lucca-sandbox': 'sandbox',
	'additional-sandboxes': 'sandbox',
	'lucca-integrations': 'integrations',
	lucca: 'lucca',
} as const satisfies Record<string, SoftwareIcon>;

/**
 * Module id of a Lucca application that has a dedicated software icon (e.g. `timmi-absences`).
 */
export type SoftwareIconModuleId = keyof typeof SOFTWARE_ICON_BY_MODULE_ID;

/**
 * Returns the software icon of a Lucca application from its module id (e.g. `timmi-absences` → `absences`),
 * or `null` when the module id is unknown or has no dedicated icon.
 */
export function getSoftwareIconFromModuleId(moduleId: SoftwareIconModuleId | (string & {}) | null | undefined): SoftwareIcon | null {
	if (!moduleId || !Object.hasOwn(SOFTWARE_ICON_BY_MODULE_ID, moduleId)) {
		return null;
	}
	return SOFTWARE_ICON_BY_MODULE_ID[moduleId as SoftwareIconModuleId];
}
