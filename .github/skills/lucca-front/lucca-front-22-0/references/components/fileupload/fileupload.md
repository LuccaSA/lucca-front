# fileupload

## Import

```typescript
import { FileDropzoneComponent, FileEntryComponent, FileEntryWrapperComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-form-field label="Label"> <lu-multi-file-upload fileMaxSize="5000000" illustration="paper" (filePicked)="fileUploadFeature.uploadFiles([$event])" /> </lu-form-field> <lu-file-entry-wrapper> @for(fileUpload of fileUploadFeature.fileUploads(); track $index) { <lu-file-entry [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" /> } </lu-file-entry-wrapper>
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
		}>` | `[]` | — | — | Liste des formats de fichiers acceptés. |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | Augmente le border-radius du champ pour l’utiliser en élément de structure. |
| `fileMaxSize` | `fileMaxSize` | `unknown` | `80 * MEGA_BYTE` | — | `luNumberAttribute` | Limite le poids des fichiers importables (en octets). |
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | Modifie l’illustration de l’icône dans la zone de drop. |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le bouton comme action principale de la page. |

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
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le nom des fichiers importés sous l’image en vue media. |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | Augmente le border-radius du champ pour l’utiliser en élément de structure. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `FileEntrySize \| null` | `null` | — | — | Modifie la taille du composant. |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | — |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | — |
| `openInNewTab` | `openInNewTab` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche les fichiers importés avec une mise en forme adaptée aux visuels. |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | — |

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
		}>` | `[]` | — | — | Liste des formats de fichiers acceptés. |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | Augmente le border-radius du champ pour l’utiliser en élément de structure. |
| `fileMaxSize` | `fileMaxSize` | `unknown` | `80 * MEGA_BYTE` | — | `luNumberAttribute` | Limite le poids des fichiers importables (en octets). |
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | Modifie l’illustration de l’icône dans la zone de drop. |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le bouton comme action principale de la page. |

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
		}>` | `[]` | — | — | Liste des formats de fichiers acceptés. |
| `structure` | `structure` | `boolean` | `false` | — | `luBooleanAttribute` | Augmente le border-radius du champ pour l’utiliser en élément de structure. |
| `fileMaxSize` | `fileMaxSize` | `unknown` | `80 * MEGA_BYTE` | — | `luNumberAttribute` | Limite le poids des fichiers importables (en octets). |
| `size` | `size` | `FileUploadSize \| null` | `null` | — | — | Modifie la taille du composant. |
| `password` | `password` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `illustration` | `illustration` | `/** @deprecated use 'invoice' instead */
		'paper' \| 'picture' \| 'invoice'` | `'invoice'` | — | — | Modifie l’illustration de l’icône dans la zone de drop. |
| `required` | `required` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `buttonFilled` | `buttonFilled` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le bouton comme action principale de la page. |
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | — |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | — |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | — |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le nom des fichiers importés sous l’image en vue media. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `filePicked` | `filePicked` | `File` | — |
| `deleteFile` | `deleteFile` | `void` | — |

## Related files

- 📝 [Code & implementation](./fileupload.component.md)
- 🎨 [Design guidelines](./fileupload.design.md)
- 🎯 [Figma design tokens](./fileupload.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)

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
