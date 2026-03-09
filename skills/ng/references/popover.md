# Popover

Floating content panel triggered by user interaction.

**Storybook:** [Documentation/Overlays/Popover/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { PopoverDirective } from '@lucca-front/ng/popover2';
```

## Basic Usage

```html
<button luButton [luPopover]="popoverContent">
  Show Info
</button>

<ng-template #popoverContent>
  <p>This is popover content.</p>
</ng-template>
```

## Inputs

### `luPopover`
Type: `TemplateRef` - Content template.

### `luPopoverPosition`
Type: `'above' | 'below' | 'before' | 'after'` (default: `'above'`)

```html
<button [luPopover]="content" luPopoverPosition="below">Below</button>
```

### `luPopoverDisabled`
Type: `boolean` - Disables the popover.

### `luPopoverNoCloseButton`
Type: `boolean` (default: `false`) - Hides the close button.

## Outputs

- `luPopoverOpened` - Emitted when popover opens
- `luPopoverClosed` - Emitted when popover closes

## Common Patterns

### Info Popover
```html
<button luButton="ghost" [luPopover]="helpContent">
  <lu-icon icon="infoCircle" alt="Help" />
</button>

<ng-template #helpContent>
  <h4>How it works</h4>
  <p>Detailed explanation here...</p>
</ng-template>
```

### User Card Popover
```html
<span [luPopover]="userCard" luPopoverPosition="below">
  {{ user.name }}
</span>

<ng-template #userCard>
  <lu-user-tile [user]="user" />
</ng-template>
```

## Accessibility

- Escape closes the popover
- Focus is managed within popover
- Trigger is linked via aria attributes
