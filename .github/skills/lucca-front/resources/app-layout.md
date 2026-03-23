# AppLayout

## Quand utiliser ce composant
- Pour structurer des pages d'application en fournissant une mise en page cohérente et réactive.
- Lorsque vous devez intégrer un en-tête, un contenu principal et un pied de page dans une seule vue.
- Pour gérer des modifications de mise en page en fonction de l'état de l'application ou des interactions utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-app-layout-angular-basic--basic)

## Composant Figma
[Vue du composant sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-96550) — Ce composant présente une structure d'application incluant un en-tête, un corps principal et un pied de page. Variante disponible : pr-AppLayout (360).

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Usage de base

```html
<lu-app-layout>
  <!-- Contenu de l'application -->
</lu-app-layout>
```

## Directive / Composant : `lu-app-layout`

Composant principal pour définir la disposition d'une application. Applicable sur les éléments HTML pour structurer l'interface.

## Inputs

### `someInput`
Type: `string` — Default: `''`

Permet de personnaliser un aspect ou une fonctionnalité spécifique de la mise en page.

```html
<lu-app-layout [someInput]="value">...</lu-app-layout>
```

## Patterns courants

### Mise en page d'application
```html
<lu-app-layout>
  <header>En-tête de l'application</header>
  <main>Contenu principal</main>
  <footer>Pied de page</footer>
</lu-app-layout>
```

## Accessibilité
Assurez-vous que le contenu est bien structuré, en utilisant des balises sémantiques appropriées pour l'en-tête, le contenu principal et le pied de page. Utilisez des attributs ARIA si nécessaire pour améliorer la navigation par clavier et les lecteurs d'écran.

## Guidelines Prisme
- Utilisez les espacements et les marges recommandés pour garantir une présentation aérée et agréable.
- Ne pas ajouter de styles inline pour préserver la cohérence visuelle à travers l'application.