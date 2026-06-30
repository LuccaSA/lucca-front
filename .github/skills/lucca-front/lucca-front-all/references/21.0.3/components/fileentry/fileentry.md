# fileentry

## Import

```typescript
import { FileDropzoneComponent, FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-entry (deleteFile)="deleteFile()" [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png', }" previewUrl="https://dummyimage.com/500" />
```

## API Reference

### FileDropzoneComponent (component)

**Selector:** `lu-file-dropzone`

### FileEntryComponent (component)

**Selector:** `lu-file-entry`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | — |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | — |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | — |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | — |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `booleanAttribute` | — |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `passwordChange` | `passwordChange` | `void` |
| `deleteFile` | `deleteFile` | `void` |

### MultiFileUploadComponent (component)

**Selector:** `lu-multi-file-upload`

### SingleFileUploadComponent (component)

**Selector:** `lu-single-file-upload`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `deleteFile` | `deleteFile` | `void` |

## Related files

- 📝 [Code & implementation](./fileentry.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./fileentry.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.3/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- 📋 [Changelog](./fileentry.changelog.md)
