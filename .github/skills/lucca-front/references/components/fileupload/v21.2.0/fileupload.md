# fileupload

## Import

```typescript
import { FileEntryComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-form-field label="Label"> <lu-multi-file-upload fileMaxSize="5000000" illustration="paper" (filePicked)="fileUploadFeature.uploadFiles([$event])" /> </lu-form-field> <div class="fileEntryDisplayWrapper"> @for(fileUpload of fileUploadFeature.fileUploads(); track $index) { <lu-file-entry [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" /> } </div>
```

## API Reference

### FileEntryComponent (component)

**Selector:** `lu-file-entry`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_FILE_UPLOAD_TRANSLATIONS` | — | — | — |
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom des fichiers importés sous l'image en vue media. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Modifie la taille du composant. |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | — |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | — |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `booleanAttribute` | Affiche les fichiers importés avec une mise en forme adaptée aux visuels. |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | — |

### SingleFileUploadComponent (component)

**Selector:** `lu-single-file-upload`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom des fichiers importés sous l'image en vue media. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `deleteFile` | `deleteFile` | `void` |

## Related files

- 📝 [Code & implementation](./fileupload.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../fileupload.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)
- 📋 [Changelog](../fileupload.changelog.md)
