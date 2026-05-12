# fieldset

## Import

```typescript
import { FormFieldComponent, InputFramedComponent, InputDirective } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
@let column= { colspanAtMediaMinXXS: 2 }; <lu-fieldset> <lu-grid mode="form"> <lu-grid-column colspan="4" [responsive]="column"> <lu-form-field label="Label"> <lu-text-input type="text" [(ngModel)]="example1" /> </lu-form-field> </lu-grid-column> <lu-grid-column colspan="4" [responsive]="column"> <lu-form-field label="Label"> <lu-text-input type="text" [(ngModel)]="example2" /> </lu-form-field> </lu-grid-column> </lu-grid>
</lu-fieldset>
```

## API Reference

### FormFieldComponent (component)

**Selector:** `lu-form-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | — |
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |
| `statusControl` | `statusControl` | `AbstractControl \| null` | `null` | — | — | — |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | — |
| `tag` | `tag` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |
| `iconAItooltip` | `iconAItooltip` | `string \| null` | `null` | — | — | — |
| `iconAIalt` | `iconAIalt` | `string \| null` | `null` | — | — | — |
| `width` | `width` | `FormFieldWidth, FormFieldWidth \| `${FormFieldWidth}`` | `null` | — | `numberAttribute` | — |
| `inlineMessage` | `inlineMessage` | `PortalContent \| null` | `null` | — | — | — |
| `errorInlineMessage` | `errorInlineMessage` | `PortalContent \| null` | `null` | — | — | — |
| `inlineMessageState` | `inlineMessageState` | `InlineMessageState \| null` | `null` | — | — | — |
| `size` | `size` | `FormFieldSize \| null` | `null` | — | — | Modifie la taille du fieldset. |
| `extraDescribedBy` | `extraDescribedBy` | `string` | `''` | — | — | — |
| `counter` | `counter` | `number` | `0` | — | — | — |

### InputFramedComponent (component)

**Selector:** `lu-input-framed`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `framedPortal` | `framedPortal` | `PortalContent \| null` | `null` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'L' \| null` | `null` | — | — | Modifie la taille du fieldset. |

### InputDirective (directive)

**Selector:** `[luInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standalone` | `luInputStandalone` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./fieldset.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../fieldset.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)
- 📋 [Changelog](../fieldset.changelog.md)
