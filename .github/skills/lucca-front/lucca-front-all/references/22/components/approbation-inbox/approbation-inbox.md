# approbation-inbox

## Import

```typescript
import { ApprobationInboxDetailMainBlockComponent, ApprobationInboxHeaderComponent, ApprobationInboxDetailComponent, ApprobationInboxLinkComponent, ApprobationInboxGroupComponent, ApprobationInboxIconsComponent, ApprobationInboxItemComponent, ApprobationInboxSubtleComponent, ApprobationInboxListComponent } from '@lucca-front/ng/approbation-inbox';
```

## API Reference

### ApprobationInboxDetailMainBlockComponent (component)

**Selector:** `lu-approbation-inbox-detail-main-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | Titre affiché dans l’en-tête du composant. |

### ApprobationInboxHeaderComponent (component)

**Selector:** `lu-approbation-inbox-detail-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | Titre affiché dans l’en-tête du composant. |
| `delegatedBy` | `delegatedBy` | `string \| null` | `null` | — | — | Nom de la personne à l’origine de la délégation si elle à lieu. |

### ApprobationInboxDetailComponent (component)

**Selector:** `lu-approbation-inbox-detail`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `insideDialog` | `insideDialog` | `unknown` | `this.dialogRef !== null` | — | `booleanAttribute` | Adapte l’affichage du composant à une utilisation dans une dialog. |

### ApprobationInboxLinkComponent (component)

**Selector:** `a[lu-approbation-inbox-list-action]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `current` | `current` | `boolean` | `false` | — | `booleanAttribute` | Définit le lien (ou le bouton) comme l’élément courant affiché. |

### ApprobationInboxGroupComponent (component)

**Selector:** `lu-approbation-inbox-list-group`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `string` | — | ✅ | — | Titre affiché dans l’en-tête du composant. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### ApprobationInboxIconsComponent (component)

**Selector:** `lu-approbation-inbox-list-icons`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icons` | `icons` | `readonly ApprobationInboxIcon[]` | `[]` | — | — | — |

### ApprobationInboxItemComponent (component)

**Selector:** `lu-approbation-inbox-list-item`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `checked` | `unknown` | — | — |

### ApprobationInboxSubtleComponent (component)

**Selector:** `lu-approbation-inbox-list-subtle`

### ApprobationInboxListComponent (component)

**Selector:** `lu-approbation-inbox-list`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `label` | `label` | `PortalContent` | `getIntl(LU_APPROBATION_INBOX_LIST_TRANSLATIONS).label` | — | — | Titre affiché dans l’en-tête du composant. |
| `selectable` | `selectable` | `boolean` | `false` | — | `booleanAttribute` | Active la sélection multiple |
| `detailsComponent` | `detailsComponent` | `ApprobationInboxDetailComponent` | — | ✅ | — | — |
| `emptyIllustration` | `emptyIllustration` | `BubbleIllustration \| string` | `'magnifyingGlass'` | — | — | Illustration affichée lorsque la liste est vide. |
| `emptyResetButton` | `emptyResetButton` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `submitEvent` | `submitEvent` | `void` | — |
| `resetEvent` | `resetEvent` | `void` | — |
| `forwardEvent` | `forwardEvent` | `void` | — |

## Related files

- 📝 [Code & implementation](./approbation-inbox.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-approbation-inbox-angular-detail--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ApprobationInboxDetailMainBlockComponent`, `ApprobationInboxHeaderComponent`, `ApprobationInboxDetailComponent`, `ApprobationInboxLinkComponent`, `ApprobationInboxGroupComponent`, `ApprobationInboxIconsComponent`, `ApprobationInboxItemComponent`, `ApprobationInboxSubtleComponent`, `ApprobationInboxListComponent`).
