# filedropzone

## Import

```typescript
import { FileDropzoneComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-dropzone />
```

## API Reference

### FileDropzoneComponent (component)

**Selector:** `lu-file-dropzone`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `accept` | `accept` | `Array<{
			format: string;
			name?: string;
		}>` | `[]` | — | — | — |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `fileMaxSize` | `fileMaxSize` | `unknown` | `80 * MEGA_BYTE` | — | `luNumberAttribute` | — |
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | — |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `filePicked` | `filePicked` | `File` | — |

## Related files

- 📝 [Code & implementation](./filedropzone.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-filedropzone-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `structure` : transform booleanAttribute → luBooleanAttribute
~ `fileMaxSize` : number → unknown, transform ∅ → luNumberAttribute
~ `password` : transform booleanAttribute → luBooleanAttribute
~ `required` : transform booleanAttribute → luBooleanAttribute
~ `buttonFilled` : transform booleanAttribute → luBooleanAttribute
