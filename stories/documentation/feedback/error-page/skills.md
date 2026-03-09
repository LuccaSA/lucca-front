---
description: Composant Error page - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - error-page
  - errorpage
  - notification
  - message
  - alert
  - status
  - feedback
  - info
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Error page

## Description

Le composant **Error page** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Error/Basic`



## Utilisation

### Quand utiliser Error page

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.errorPage` | Classe de base |
| `.errorPage-section` | Classe de base |
| `.errorPage-section-info` | Classe de base |
| `.errorPage-section-info-title` | Classe de base |
| `.errorPage-section-info-text` | Classe de base |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
