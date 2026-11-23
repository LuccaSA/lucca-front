# reorder

## Import

```typescript
import { ReorderHandleComponent, ReorderItemLabelDirective, ReorderDirective } from '@lucca-front/ng/reorder';
```

## Basic Usage

```html
<ul class="reorderDemo" cdkDropList luReorder (luReorder)="onReorder($event)"> @for (item of items; track item) { <li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item"> <lu-reorder-handle /> {{ item }} </li> }
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```

## API Reference

### ReorderHandleComponent (component)

**Selector:** `lu-reorder-handle`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'S' \| 'XS'` | `'S'` | — | — | — |

### ReorderItemLabelDirective (directive)

**Selector:** `[luReorderItemLabel]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luReorderItemLabel` | `luReorderItemLabel` | `string` | — | ✅ | — | — |

### ReorderDirective (directive)

**Selector:** `[luReorder]`

**exportAs:** `luReorder`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luReorderLabel` | `luReorderLabel` | `string \| null` | `null` | — | — | — |
| `luReorderFlow` | `luReorderFlow` | `'row' \| 'column'` | `'row'` | — | — | Sens d’écoulement d’une liste `mixed` : en lignes (Alt + ← / →) ou en colonnes (Alt + ↑ / ↓). |
| `luReorderEdgesExcluded` | `luReorderEdgesExcluded` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `luReorderIntl` | `luReorderIntl` | `unknown` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `luReorder` | `luReorder` | `ReorderEvent<T>` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_REORDER_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./reorder.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-listings-reorder-angular-basic--docs)
