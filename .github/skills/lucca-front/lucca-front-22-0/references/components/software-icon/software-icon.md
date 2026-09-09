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
	'cloud-control' \| 'ask-lucca' \| 'ask-salesforce' \| 'calendar' \| 'administration' \| 'client-center' \| 'sandbox' \| 'store' \| 'lucca'` | — | ✅ | — | Modifie l’icône produit. |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Marque le produit comme inactif. |
| `withTooltip` | `withTooltip` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute une info-bulle qui reprend l’alternative textuelle de l’icône. (Ce paramètre est automatiquement activé quand l’i… |
| `iconAlt` | `iconAlt` | `string` | `''` | — | — | Texte alternatif de l’illustration restitué par les lecteurs d’écran. |
| `size` | `size` | `SoftwareIconSize \| ''` | `''` | — | — | Modifie la taille du composant. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_SOFTWARE_ICON_WRAPPER` | `boolean` | — |

## Related files

- 📝 [Code & implementation](./software-icon.component.md)
- 🎨 [Design guidelines](./software-icon.design.md)
- 🎯 [Figma design tokens](./software-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`SoftwareIconComponent`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Added

- `salesforce` value for the `icon` input.

#### 21.3.0

##### Added

- `SOFTWARE_ICON` and `SOFTWARE_ICON_SIZE` constants, together with the `SoftwareIcon` and `SoftwareIconSize` types, are now publicly exported and used to type the `icon` and `size` inputs.

#### 21.2.3

##### Added

- `iconAlt` input to provide an alternative text for the icon.
- `withTooltip` input to reveal the icon label in a tooltip.
- `LU_SOFTWARE_ICON_WRAPPER` injection token, set when the icon is rendered inside a `lu-software-icon-wrapper`.

#### 21.2.2

##### Added

- New icons in the available software list.

#### 21.1.4

##### Added

- New product icons in the available software list.

#### 21.1.1

##### Added

- Face and mood icons.

##### Fixed

- Naming of some icons.

#### 21.1.0

##### Added

- `lu-software-icon` component (`softwareIcon`) with the required `icon` input plus `size` and `disabled`.
