# Empty State

Component for displaying empty or no-data states.

**Storybook:** [Documentation/Feedback/EmptyState/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Empty State - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=21818-68812)  
**Node ID:** `21818-68812`

## Import

```typescript
import { EmptyStateComponent } from '@lucca-front/ng/empty-state';
```

## Basic Usage

```html
<lu-empty-state 
  heading="No results found" 
  description="Try adjusting your search or filters." />
```

## Inputs

### `heading`
Type: `string`

Main heading text.

### `description`
Type: `string`

Secondary description text.

### `icon`
Type: `LuccaIcon`

Icon to display above the heading.

```html
<lu-empty-state 
  icon="search"
  heading="No results" 
  description="We couldn't find any matches." />
```

### `illustration`
Type: `string`

Path to an illustration image.

```html
<lu-empty-state 
  illustration="/assets/empty-inbox.svg"
  heading="Inbox empty" 
  description="You're all caught up!" />
```

## With Actions

Project action buttons into the empty state.

```html
<lu-empty-state 
  heading="No projects yet" 
  description="Create your first project to get started.">
  <button luButton (click)="createProject()">Create Project</button>
</lu-empty-state>
```

## Common Patterns

### Search No Results
```html
<lu-empty-state 
  icon="search"
  heading="No results found" 
  description="Try different keywords or remove filters.">
  <button luButton="outlined" (click)="clearFilters()">Clear Filters</button>
</lu-empty-state>
```

### Empty List
```html
<lu-empty-state 
  heading="No items" 
  description="Add your first item to get started.">
  <button luButton (click)="addItem()">
    <lu-icon icon="plusSign" alt="" />
    Add Item
  </button>
</lu-empty-state>
```

### Error State
```html
<lu-empty-state 
  icon="signWarning"
  heading="Something went wrong" 
  description="We couldn't load the data. Please try again.">
  <button luButton (click)="retry()">Retry</button>
</lu-empty-state>
```

### In Data Table
```html
@if (items.length === 0) {
  <lu-empty-state 
    heading="No data" 
    description="No records match your criteria." />
} @else {
  <lu-data-table>...</lu-data-table>
}
```

### Access Denied
```html
<lu-empty-state 
  icon="lock"
  heading="Access denied" 
  description="You don't have permission to view this content.">
  <a luLink routerLink="/home">Go to Home</a>
</lu-empty-state>
```
