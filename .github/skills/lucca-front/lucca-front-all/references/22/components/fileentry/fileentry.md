# fileentry

## Import

```typescript
import { FileDropzoneComponent, FileEntryComponent, FileEntryWrapperComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-entry (deleteFile)="deleteFile()" [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png', }" withFileSize withFileType previewUrl="https://dummyimage.com/500" inlineMessageError="Virus détecté dans le fichier." />
```

## API Reference

### FileDropzoneComponent (component)

**Selector:** `lu-file-dropzone`






### FileEntryComponent (component)

**Selector:** `lu-file-entry`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l’état du composant. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le nom du fichier sous l’image en vue media. |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `FileEntrySize \| null` | `null` | — | — | Modifie la taille du composant. |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | Remplace l’icône de format de fichier. |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | URL de téléchargement du fichier. |
| `openInNewTab` | `openInNewTab` | `boolean` | `false` | — | `luBooleanAttribute` | Ouvre le fichier dans un nouvel onglet au lieu de le télécharger. Peut varier selon les navigateurs ou les réglages util… |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le fichier avec une mise en forme adaptée aux visuels. |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | URL de prévisualisation de l’image uploadée. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `passwordChange` | `passwordChange` | `void` | — |
| `deleteFile` | `deleteFile` | `void` | — |


### FileEntryWrapperComponent (component)

**Selector:** `lu-file-entry-wrapper`






### MultiFileUploadComponent (component)

**Selector:** `lu-multi-file-upload`






### SingleFileUploadComponent (component)

**Selector:** `lu-single-file-upload`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l’état du composant. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | URL de prévisualisation de l’image uploadée. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le nom du fichier sous l’image en vue media. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `deleteFile` | `deleteFile` | `void` | — |








## Related files

- 📝 [Code & implementation](./fileentry.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`FileDropzoneComponent`, `FileEntryComponent`, `FileEntryWrapperComponent`, `MultiFileUploadComponent`, `SingleFileUploadComponent`).
