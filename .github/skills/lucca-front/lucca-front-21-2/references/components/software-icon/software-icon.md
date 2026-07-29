# software-icon

## Import

```typescript
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
```

## Basic Usage

```html
<lu-software-icon icon="absences" iconAlt="Absences" />
```

## API Reference

### SoftwareIconComponent (component)

**Selector:** `lu-software-icon`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `// Time and Activities
	'absences' \| 'timesheet' \| 'office' \| 'projects' \| 'shifts' \| // Talent Management
	'performance' \| 'engagement' \| 'training' \| 'recruitment' \| 'mood' \| // Employee Administration
	'analytics' \| 'employee-administration' \| 'shared-documents' \| 'faces' \| // Spend Management
	'business-expenses' \| 'invoices' \| 'payment-methods' \| 'accounting-assistant' \| 'certified-einvoicing-platform' \| // Compensation and Benefits
	'compensation' \| 'payslip' \| 'benefits' \| 'payroll-assistant' \| // Lucca
	'cloud-control' \| 'ask-lucca' \| 'calendar' \| 'administration' \| 'client-center' \| 'sandbox' \| 'store' \| 'lucca'` | — | ✅ | — | Modifie l’icône produit. |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Marque le produit comme inactif. |
| `withTooltip` | `withTooltip` | `boolean` | `false` | — | `booleanAttribute` | Ajoute une info-bulle qui reprend l’alternative textuelle de l’icône. (Ce paramètre est automatiquement activé quand l’i… |
| `iconAlt` | `iconAlt` | `string` | `''` | — | — | Texte alternatif de l’illustration restitué par les lecteurs d’écran. |
| `size` | `size` | `'XXS' \| 'XS' \| 'S' \| 'L' \| ''` | `''` | — | — | Modifie la taille du composant. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_SOFTWARE_ICON_WRAPPER` | `boolean` | — |

## Related files

- 📝 [Code & implementation](./software-icon.component.md)
- 🎨 [Design guidelines](./software-icon.design.md)
- 🎯 [Figma design tokens](./software-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.2.4

+ `withTooltip` : boolean
+ `iconAlt` : string
~ `icon` : // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | 'certified-einvoicing-platform' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca
	'administration' | 'cloud-control' | 'client-center' | 'sandbox' | 'store' | 'ask-lucca' | 'lucca' → // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | 'certified-einvoicing-platform' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca
	'cloud-control' | 'ask-lucca' | 'calendar' | 'administration' | 'client-center' | 'sandbox' | 'store' | 'lucca'
+ token `LU_SOFTWARE_ICON_WRAPPER` : boolean

### 21.2.2

~ `icon` : // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | 'certified-einvoicing-platform' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca

	'administration' | 'cloud-control' | 'lucca' → // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | 'certified-einvoicing-platform' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca
	'administration' | 'cloud-control' | 'client-center' | 'sandbox' | 'store' | 'ask-lucca' | 'lucca'

### 21.1.4

~ `icon` : // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca

	'administration' | 'cloud-control' | 'lucca' → // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | 'certified-einvoicing-platform' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca

	'administration' | 'cloud-control' | 'lucca'

### 21.1.1

~ `icon` : // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'planning' | // Talent Management
	'perfomance' | 'engagement' | 'training' | 'recruitment' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca
	'mood' | 'faces' | 'administration' | 'cloud-control' | 'lucca' → // Time and Activities
	'absences' | 'timesheet' | 'office' | 'projects' | 'shifts' | // Talent Management
	'performance' | 'engagement' | 'training' | 'recruitment' | 'mood' | // Employee Administration
	'analytics' | 'employee-administration' | 'shared-documents' | 'faces' | // Spend Management
	'business-expenses' | 'invoices' | 'payment-methods' | 'accounting-assistant' | // Compensation and Benefits
	'compensation' | 'payslip' | 'benefits' | 'payroll-assistant' | // Lucca

	'administration' | 'cloud-control' | 'lucca'

### 21.1.0

Composant introduit (`SoftwareIconComponent`).
