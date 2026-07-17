# core-select-job-qualification

## Import

```typescript
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
```

## API Reference

### LuCoreSelectJobQualificationsDirective (directive)

**Selectors:** `lu-simple-select[jobQualifications]`, `lu-multi-select[jobQualifications]`

**exportAs:** `jobQualifications`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `url` | `url` | `string` | `'/organization/structure/api/job-qualifications'` | — | — | — |
| `filters` | `filters` | `Record<string, string \| number \| boolean> \| null` | `null` | — | — | — |
| `searchDelimiter` | `searchDelimiter` | `string` | `' '` | — | — | — |

## Related files

- 📋 [Changelog](./core-select-job-qualification.changelog.md)
