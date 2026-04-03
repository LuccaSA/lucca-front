# PLG Push

## Quand utiliser ce composant
1. Pour promouvoir une nouvelle fonctionnalité ou un produit disponible dans l'écosystème Lucca, notamment auprès des utilisateurs en télétravail.
2. Pour inciter les utilisateurs à découvrir de nouvelles solutions ou à demander un essai gratuit.
3. Pour afficher un message publicitaire contextualisé dans une interface avec un appel incitatif clair.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-plg-push-angular-basic--template)

## Composant Figma
- [PLG Push](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=22031-14975) : Aperçu visuel et variantes disponibles.

## Import

```typescript
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-plg-push>
  Profitez des avantages uniques de notre solution PLG !
  <a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
    <span class="link-text">Découvrir</span>
    <span class="link-icon">
      <lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre"></lu-icon>
    </span>
  </a>
</lu-plg-push>
```

## Composant : `<lu-plg-push>`

Une boîte de texte configurable pour mettre en avant une fonctionnalité ou une solution Lucca, intégrant du texte et des liens.

## Inputs

### `heading`
Type: `string | undefined` — Default: `undefined`

Ajoute un titre au-dessus du contenu principal. Si non défini, aucun titre n'est affiché.

```html
<lu-plg-push [heading]="'Découvrez Timmi Office'">
  Gérez facilement le télétravail dans votre entreprise !
</lu-plg-push>
```

### `removable`
Type: `boolean` — Default: `false`

Permet de rendre le composant supprimable par l'utilisateur via une croix d'action.

- `true` : Affiche une croix en haut à droite pour fermer le composant.
- `false` : L'élément est fixe.

```html
<lu-plg-push [removable]="true" [heading]="'Nouvelle Fonctionnalité !'">
  Essayez nos nouveaux outils pour booster la productivité.
</lu-plg-push>
```

## Patterns courants

### Push avec un lien et une description
```html
<lu-plg-push [heading]="'Timmi Office'">
  Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
  <a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
    <span class="link-text">Demander un essai gratuit</span>
    <span class="link-icon">
      <lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre"></lu-icon>
    </span>
  </a>
</lu-plg-push>
```

### Push supprimable
```html
<lu-plg-push [removable]="true" [heading]="'Nouvelle Fonctionnalité !'">
  Essayez maintenant avec un essai gratuit ! 
  <a class="link" href="/essai-gratuit" target="_blank" rel="noopener noreferrer">Commencer</a>
</lu-plg-push>
```

## Accessibilité
- Utilisez une alternative textuelle (`alt`) descriptive pour les icônes, comme ici : `alt="Ouvrir dans une nouvelle fenêtre"`.
- Les liens doivent inclure des attributs `target="_blank"` et `rel="noopener noreferrer"` pour éviter les vulnérabilités de sécurité.
- Conservez une structure hiérarchique logique avec `heading` pour introduire correctement les informations.

## Guidelines Prisme
Consultez les guidelines pour le composant PLG Push dans Prisme : [PLG Push](https://prisme.lucca.io/94310e217/v/latest/p/6035eb).