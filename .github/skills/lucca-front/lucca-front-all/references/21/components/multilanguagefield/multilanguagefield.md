# multilanguagefield

## Import

```typescript
import { MultilanguageInputComponent } from '@lucca-front/ng/forms';
```

## API Reference

### MultilanguageInputComponent (component)

**Selector:** `lu-multilanguage-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `placeholder` | `placeholder` | `string` | `''` | — | — | Modifie le placeholder au champ. |
| `openOnFocus` | `openOnFocus` | `boolean` | `false` | — | `booleanAttribute` | — |
| `autocomplete` | `autocomplete` | `AutoFill` | `'off'` | — | — | — |
| `hasNoInvariant` | `hasNoInvariant` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hasAIButtons` | `hasAIButtons` | `boolean` | `false` | — | `booleanAttribute` | — |
| `displayLocale` | `displayLocale` | `string` | `''` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `translateWithAI` | `translateWithAI` | `string` |

## Related files

- 📝 [Code & implementation](./multilanguagefield.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./multilanguagefield.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)
- 📋 [Changelog](./multilanguagefield.changelog.md)
