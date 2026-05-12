# data-presentation

## Import

```typescript
import { FormFieldComponent, InputFramedComponent, InputDirective, PresentationDisplayDirective, DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
<lu-data-presentation label="label">Value</lu-data-presentation>
```

## API Reference

### FormFieldComponent (component)

**Selector:** `lu-form-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_FORM_FIELD_TRANSLATIONS` | — | — | — |
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `hiddenLabel` | `hiddenLabel` | `boolean` | `false` | — | `booleanAttribute` | — |
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |
| `statusControl` | `statusControl` | `AbstractControl \| null` | `null` | — | — | — |
| `tooltip` | `tooltip` | `string \| SafeHtml \| null` | `null` | — | — | — |
| `tag` | `tag` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |
| `iconAItooltip` | `iconAItooltip` | `string \| null` | `null` | — | — | — |
| `iconAIalt` | `iconAIalt` | `string \| null` | `null` | — | — | — |
| `width` | `width` | `FormFieldWidth, FormFieldWidth \| `${FormFieldWidth}` \| null` | `null` | — | `numberAttribute` | — |
| `inlineMessage` | `inlineMessage` | `PortalContent \| null` | `null` | — | — | — |
| `errorInlineMessage` | `errorInlineMessage` | `PortalContent \| null` | `null` | — | — | — |
| `inlineMessageState` | `inlineMessageState` | `InlineMessageState \| null` | `null` | — | — | — |
| `size` | `size` | `FormFieldSize \| null` | `null` | — | — | — |
| `extraDescribedBy` | `extraDescribedBy` | `string` | `''` | — | — | — |
| `counter` | `counter` | `number` | `0` | — | — | — |
| `presentation` | `presentation` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `layout` | `'default' | 'checkable' | 'fieldset'` | — |

### InputFramedComponent (component)

**Selector:** `lu-input-framed`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `framedPortal` | `framedPortal` | `PortalContent \| null` | `null` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'L' \| null` | `null` | — | — | — |

### InputDirective (directive)

**Selector:** `[luInput]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `standalone` | `luInputStandalone` | `boolean` | `false` | — | `booleanAttribute` | — |

### PresentationDisplayDirective (directive)

**Selector:** `[luPresentationDisplay]`

### DataPresentationComponent (component)

**Selector:** `lu-data-presentation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `noValue` | `noValue` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./data-presentation.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../data-presentation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)
- 📋 [Changelog](../data-presentation.changelog.md)
