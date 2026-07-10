# impersonation

## Import

```typescript
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
```

## Basic Usage

```html
<lu-impersonation [(selectedUser)]="example" (clear)="example= me" /> <pr-story-model-display>{{example | json}}</pr-story-model-display>
```

## API Reference

### ImpersonationComponent (component)

**Selector:** `lu-impersonation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | `booleanAttribute` | Inclus les collaborateurs partis |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `clear` | `clear` | `void` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `selectedUser` | `ILuUser` | — |

## Related files

- 📝 [Code & implementation](./impersonation.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-impersonation-angular--docs)
- 📋 [Changelog](./impersonation.changelog.md)
