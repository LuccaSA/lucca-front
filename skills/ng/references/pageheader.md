# PageHeader

Components for layout structuring.

**Storybook:** `Documentation/Structure/PageHeader/Angular/Basic`

### Imports

```typescript
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

### Examples

```html
<lu-page-header ...> ..................... </lu-page-header>
```
### CSS Classes

| Class | Type |
|-------|------|
| `.horizontalNavigation-list-item-action` | Base |
| `.breadcrumbs-list-item-action` | Base |
| `.pageHeader` | Base |
| `.mod-onlyIcon` | Modifier |
| `.mod-ghost` | Modifier |
| `.mod-search` | Modifier |
| `.mod-outline` | Modifier |
| `.mod-XS` | Modifier |

### When to use

- Content organization
- Layout
- Containers

### When not to use

- Interactive components

### Accessibility

- Use appropriate landmarks
- Maintain logical reading order
- Structure content semantically
