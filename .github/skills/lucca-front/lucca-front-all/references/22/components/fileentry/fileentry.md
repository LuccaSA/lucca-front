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
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `filePicked` | `filePicked` | `File` | — |

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
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `filePicked` | `filePicked` | `File` | — |

### SingleFileUploadComponent (component)

**Selector:** `lu-single-file-upload`

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
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | — |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l’état du composant. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | URL de prévisualisation de l’image uploadée. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le nom du fichier sous l’image en vue media. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `filePicked` | `filePicked` | `File` | — |
| `deleteFile` | `deleteFile` | `void` | — |

## Related files

- 📝 [Code & implementation](./fileentry.component.md)
- 🎨 [Design guidelines](./fileentry.design.md)
- 🎯 [Figma design tokens](./fileentry.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

+ component `FileEntryWrapperComponent` (lu-file-entry-wrapper)
`FileDropzoneComponent` :
  ~ `structure` : transform booleanAttribute → luBooleanAttribute
  ~ `fileMaxSize` : number → unknown, transform ∅ → luNumberAttribute
  ~ `password` : transform booleanAttribute → luBooleanAttribute
  ~ `required` : transform booleanAttribute → luBooleanAttribute
  ~ `buttonFilled` : transform booleanAttribute → luBooleanAttribute
`FileEntryComponent` :
  + `structure` : boolean
  ~ `displayFileName` : transform booleanAttribute → luBooleanAttribute
  ~ `openInNewTab` : transform booleanAttribute → luBooleanAttribute
  ~ `media` : transform booleanAttribute → luBooleanAttribute
`MultiFileUploadComponent` :
  ~ `structure` : transform booleanAttribute → luBooleanAttribute
  ~ `fileMaxSize` : number → unknown, transform ∅ → luNumberAttribute
  ~ `password` : transform booleanAttribute → luBooleanAttribute
  ~ `required` : transform booleanAttribute → luBooleanAttribute
  ~ `buttonFilled` : transform booleanAttribute → luBooleanAttribute
`SingleFileUploadComponent` :
  ~ `structure` : transform booleanAttribute → luBooleanAttribute
  ~ `fileMaxSize` : number → unknown, transform ∅ → luNumberAttribute
  ~ `password` : transform booleanAttribute → luBooleanAttribute
  ~ `required` : transform booleanAttribute → luBooleanAttribute
  ~ `buttonFilled` : transform booleanAttribute → luBooleanAttribute
  ~ `displayFileName` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.1

##### Added

- `openInNewTab` input on `lu-file-entry` to open the `downloadURL` in a new tab.

##### Fixed

- Icon preview of `lu-file-entry`.

#### 21.3.0

##### Added

- `FILE_ENTRY_STATE`, `FILE_ENTRY_SIZE`, `FILE_UPLOAD_STATE` and `FILE_UPLOAD_SIZE` constants, together with their matching types, are now publicly exported and used to type the `state` and `size` inputs.

#### 21.2.2

##### Fixed

- File size is displayed even when it equals `0`.

#### 21.2.0

##### Added

- Content slot to display a tag next to the file.
- `media` and `size` of a `lu-file-entry` can now be left undefined.

#### 21.1.4

##### Fixed

- Divider rendering between file entries.

#### 21.1.2

##### Added

- `buttonFilled` input to render the upload button with the filled style instead of the outlined one.

#### 21.1.0

##### Added

- `formatFileSize` function is now publicly exported.

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

##### Fixed

- The displayed file type now matches the actual file.

#### 20.3.1

##### Fixed

- Typing of the `state` input.

#### 19.3.0

##### Added

- `lu-single-file-upload`, `lu-multi-file-upload`, `lu-file-dropzone` and `lu-file-entry` components, with the `accept`, `fileMaxSize`, `required`, `state`, `size`, `illustration`, `iconOverride`, `displayFileName`, `downloadURL`, `previewUrl`, `password`, `inlineMessageError` and `intl` inputs, plus the `filePicked`, `deleteFile` and `passwordChange` outputs.
