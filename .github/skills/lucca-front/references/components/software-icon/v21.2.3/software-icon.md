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

## Related files

- 📝 [Code & implementation](./software-icon.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../software-icon.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.3/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)
- 📋 [Changelog](../software-icon.changelog.md)
