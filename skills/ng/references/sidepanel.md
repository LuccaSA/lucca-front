# Sidepanel

Sliding panel component from the side of the screen.

**Storybook:** [Documentation/Overlays/Sidepanel/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { 
  SidepanelComponent,
  SidepanelService,
  provideSidepanel 
} from '@lucca-front/ng/sidepanel';
```

## Basic Usage

Similar to dialog but slides from the side.

```typescript
@Component({...})
export class MyComponent {
  private sidepanelService = inject(SidepanelService);

  openPanel() {
    this.sidepanelService.open({
      content: FilterPanelComponent,
      position: 'end' // or 'start'
    });
  }
}
```

## Configuration

### `position`
Type: `'start' | 'end'` (default: `'end'`) - Side from which panel slides.

### `size`
Type: `'S' | 'M' | 'L'` - Panel width.

### `backdrop`
Type: `boolean` (default: `true`) - Show backdrop.

## Common Patterns

### Filter Panel
```typescript
openFilters() {
  const ref = this.sidepanelService.open({
    content: FiltersPanelComponent,
    position: 'end',
    size: 'M'
  });

  ref.closed$.subscribe(filters => {
    if (filters) {
      this.applyFilters(filters);
    }
  });
}
```

### Details Panel
```html
<button luButton (click)="showDetails(item)">View Details</button>
```

```typescript
showDetails(item: Item) {
  this.sidepanelService.open({
    content: ItemDetailsPanelComponent,
    data: { item },
    position: 'end',
    size: 'L'
  });
}
```

## Accessibility

- Focus trapped within panel
- Escape closes panel
- Backdrop click closes panel (configurable)

