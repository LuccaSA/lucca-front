# reorder

## Import

```typescript
import { ReorderHandleComponent, ReorderItemLabelDirective, ReorderDirective } from '@lucca-front/ng/reorder';
```

## Basic Usage

```html
<ul class="reorderDemo" cdkDropList luReorder [luReorderActionsExcluded] [luReorderShortcutsHidden] (luReorder)="onReorder($event)"> @for (item of items; track item) { <li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item"> <button type="button" lu-reorder-handle class="button mod-ghost mod-onlyIcon mod-S"> <lu-icon icon="dotsDrag" /> </button> {{ item }} </li> }
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```

## API Reference

### ReorderHandleComponent (component)

**Selector:** `[lu-reorder-handle]`

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
| `luReorderActionsExcluded` | `luReorderActionsExcluded` | `readonly ReorderOptionalAction[]` | `[]` | — | — | — |
| `luReorderShortcutsHidden` | `luReorderShortcutsHidden` | `readonly ReorderMenuEntry[], boolean \| '' \| readonly ReorderMenuEntry[]` | `[]` | — | — | — |
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
