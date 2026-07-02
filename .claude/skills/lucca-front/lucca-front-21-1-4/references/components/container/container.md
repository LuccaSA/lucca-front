# container

## Import

```typescript
import { ContainerComponent } from '@lucca-front/ng/container';
```

## Basic Usage

```html
<lu-container> <div class="fakeContent">container</div>
</lu-container>
<lu-container> <div class="fakeContent">container</div>
</lu-container>
<lu-container> <div class="fakeContent">container</div>
</lu-container>
```

## API Reference

### ContainerComponent (component)

**Selector:** `lu-container`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | Centre horizontalement le container. |
| `overflow` | `overflow` | `boolean` | `false` | — | `booleanAttribute` | — |
| `max` | `max` | `null \| 'M' \| 'L' \| 'XL' \| 'XXL' \| 'XXXL'` | `null` | — | — | Définit la largeur maximale du container. |

## Related files

- 📝 [Code & implementation](./container.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-container-angular-basic--docs)
- 📋 [Changelog](./container.changelog.md)
