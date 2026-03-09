---
description: Composant File upload - composants pour la saisie et validation de données utilisateur
triggers:
  - file-upload
  - fileupload
  - button
  - fileentry
  - multifileupload
  - singlefileupload
  - form-field
  - formfield
  - forms
  - textinput
  - input
  - luinput
  - form
  - field
  - control
  - validation
  - saisie
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# File upload

## Description

Le composant **File upload** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/File/FileUpload/Angular/Basic`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FileEntry, FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser File upload

- Saisie de données
- Formulaires
- Configuration
- Filtres

### Quand ne pas utiliser

- Affichage de données en lecture seule
- Navigation

## Exemples

### Exemple basique

```html
<lu-form-field label=
```

### Autres exemples

```html
@let fileUpload = fileUploadFeature.fileUploads()[0]; <lu-form-field label=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.fileEntryDisplayWrapper` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
