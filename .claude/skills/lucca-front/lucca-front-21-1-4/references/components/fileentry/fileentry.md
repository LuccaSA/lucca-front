# fileentry

## Import

```typescript
import { FileDropzoneComponent, FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-entry (deleteFile)="deleteFile()" [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png', }" previewUrl="https://dummyimage.com/500" inlineMessageError="Virus détecté dans le fichier." />
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
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l'état du composant. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom du fichier sous l'image en vue media. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | Message d'erreur affiché sous le composant. |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Modifie la taille du composant. |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | Remplace l'icône de format de fichier. |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | URL de téléchargement du fichier. |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `booleanAttribute` | Affiche le fichier avec une mise en forme adaptée aux visuels. |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | URL de prévisualisation de l'image uploadée. |

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
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l'état du composant. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | Message d'erreur affiché sous le composant. |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | URL de prévisualisation de l'image uploadée. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom du fichier sous l'image en vue media. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `deleteFile` | `deleteFile` | `void` |

## Related files

- 📝 [Code & implementation](./fileentry.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./fileentry.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- 📋 [Changelog](./fileentry.changelog.md)
