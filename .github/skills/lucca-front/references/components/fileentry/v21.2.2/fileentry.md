# fileentry

## Import

```typescript
import { FileEntryComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-entry [entry]="{ name: '', size: , type: , }" />
```

## API Reference

### FileEntryComponent (component)

**Selector:** `lu-file-entry`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | `...intlInputOptions(LU_FILE_UPLOAD_TRANSLATIONS` | — | — | — |
| `state` | `state` | `'success' \| 'loading' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l’état du composant. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom du fichier sous l’image en vue media. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | Message d’erreur affiché sous le composant. |
| `entry` | `entry` | `FileEntry` | — | ✅ | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Modifie la taille du composant. |
| `iconOverride` | `iconOverride` | `string` | `''` | — | — | Remplace l’icône de format de fichier. |
| `downloadURL` | `downloadURL` | `string` | `''` | — | — | URL de téléchargement du fichier. |
| `password` | `password` | `string` | `''` | — | — | — |
| `media` | `media` | `boolean` | `false` | — | `booleanAttribute` | Affiche le fichier avec une mise en forme adaptée aux visuels. |
| `previewUrl` | `previewUrl` | `string` | `''` | — | — | URL de prévisualisation de l’image uploadée. |

### SingleFileUploadComponent (component)

**Selector:** `lu-single-file-upload`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `entry` | `entry` | `FileEntry \| null` | `null` | — | — | — |
| `state` | `state` | `'loading' \| 'success' \| 'error' \| 'default'` | `'default'` | — | — | Modifie l’état du composant. |
| `inlineMessageError` | `inlineMessageError` | `string \| null` | `null` | — | — | Message d’erreur affiché sous le composant. |
| `previewUrl` | `previewUrl` | `string \| null` | `null` | — | — | URL de prévisualisation de l’image uploadée. |
| `displayFileName` | `displayFileName` | `boolean` | `false` | — | `booleanAttribute` | Affiche le nom du fichier sous l’image en vue media. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `deleteFile` | `deleteFile` | `void` |

## Related files

- 📝 [Code & implementation](./fileentry.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../fileentry.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- 📋 [Changelog](../fileentry.changelog.md)
