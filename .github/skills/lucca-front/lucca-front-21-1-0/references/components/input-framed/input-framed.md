# input-framed

## Import

```typescript
import { InputFramedComponent } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message"> <lu-radio-group-input [(ngModel)]="example" framed required> <lu-radio value="A"> Option A </lu-radio> <lu-radio value="B"> Option B </lu-radio> <lu-radio value="C" disabled> Option C </lu-radio> <lu-radio value="D"> Option D </lu-radio> </lu-radio-group-input> </lu-form-field>
```

## API Reference

### InputFramedComponent (component)

**Selector:** `lu-input-framed`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `framedPortal` | `framedPortal` | `PortalContent \| null` | `null` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | Aligne le champ et son illustration verticalement lorsque le label est trop court. |
| `size` | `size` | `'L' \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./input-framed.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./input-framed.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)
- 📋 [Changelog](./input-framed.changelog.md)
