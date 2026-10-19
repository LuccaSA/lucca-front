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
| `center` | `center` | `boolean` | `false` | — | `luBooleanAttribute` | Centre horizontalement le container. |
| `overflow` | `overflow` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `max` | `max` | `ContainerSize \| null` | `null` | — | — | Définit la largeur maximale du container. |

## Related files

- 📝 [Code & implementation](./container.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-container-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `center` : transform booleanAttribute → luBooleanAttribute
~ `overflow` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `CONTAINER_SIZE` constant and `ContainerSize` type are now publicly exported and used to type the `max` input.

#### 21.2.0

##### Fixed

- Default `display` no longer overrides the layout of the container's content.
- `justify-content` is no longer forced by the container.

#### 20.3.0

##### Added

- `lu-container` component (`container`) with the `center`, `max` and `overflow` inputs.

#### 20.1.0

##### Added

- Container support inside `pageHeader` and `footer` to align their content with the page container.
