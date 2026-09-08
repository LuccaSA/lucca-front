# pageheader

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
```

## Basic Usage

```html
<lu-page-header label="H1. Page title" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum." />
```

## API Reference

### PageHeaderComponent (component)

**Selector:** `lu-page-header`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `description` | `description` | `PortalContent \| null` | `null` | — | — | Description du composant. [PortalContent] |
| `label` | `label` | `PortalContent \| null` | `null` | — | — | Titre du composant. [PortalContent] |
| `container` | `container` | `boolean` | `false` | — | `luBooleanAttribute` | [v20.1] Applique un container autour du contenu de Page Header. |
| `sticky` | `sticky` | `boolean` | `false` | — | `luBooleanAttribute` | [v21.2] Applique un comportement sticky au Page Header quand celui ci n’est pas géré par le Main Layout |









## Related files

- 📝 [Code & implementation](./pageheader.component.md)
- 🎨 [Design guidelines](./pageheader.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`PageHeaderComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- The responsive behaviour introduced in `21.2.5` for long titles has been reverted.

#### 21.2.5

##### Fixed

- Responsive behaviour of long titles.

#### 21.2.0

##### Added

- `sticky` input to keep the page header visible while scrolling.

#### 21.0.4

##### Changed

- `description` color.

#### 21.0.0

##### Changed

- Back button redesign.

#### 20.3.1

##### Fixed

- The component now imports the `title` SCSS component it relies on.

#### 20.1.3

##### Fixed

- Gap between the title and the surrounding elements.

#### 20.1.2

##### Fixed

- Conditions under which the header becomes sticky.

#### 20.1.0

##### Added

- `container` support to align the header content with the page container.

#### 19.3.3

##### Added

- Leading and trailing content slots.

##### Fixed

- Heading padding and outer margin.

#### 19.3.0

##### Added

- `lu-page-header` component (`pageHeader`) with the `label`, `description` and `container` inputs.

#### 19.1.6

##### Fixed

- Gap between the header actions.

#### 18.2.4

##### Changed

- Title `max-inline-size` capped to `50rem`.

#### 18.2.0

##### Added

- Back button.

##### Changed

- Component padding.

#### 18.1.1

##### Changed

- `description` `max-inline-size` reduced from `50rem` to `33.5rem`.
