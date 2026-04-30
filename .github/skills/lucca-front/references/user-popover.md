# pr-UserPopover

## Quand utiliser ce composant
- Afficher rapidement des informations clés d’un collaborateur au survol ou au clic de son avatar/nom dans une liste de résultats, un tableau, ou une carte.
- Proposer des accès directs vers la fiche collaborateur, Timmi Absences ou Timmi Office sans quitter le contexte de la page.
- Aider à la désambiguïsation lorsque plusieurs collaborateurs ont des noms similaires (en montrant poste, département, localisation, statut d’absence).

## Stories Storybook
- Documentation complète: https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-user-popover--docs
- Popover / Basic (Angular): https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-popover-angular--basic

## Composant Figma
- Lien: https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18202-1181
- Description: User popover présentant l’identité du collaborateur, son poste, son département, son lieu de travail et ses absences, avec des actions vers la fiche collaborateur, Timmi Absences et Timmi Office.
- Variantes: pr-UserPopover

## Import

```typescript
// Le chemin d'import Angular n'est pas exposé dans les stories publiques consultables.
// Veuillez vous référer au Storybook Angular "Popover / Basic" pour récupérer l'importPath réel depuis la section "Source".
```

## Usage de base

```html
<!-- Voir la story Angular "Popover / Basic" pour l'exemple d'usage exact (sélecteur et inputs) -->
<!-- Le composant/directive s'applique sur un déclencheur (avatar, nom, etc.) et affiche le popover d'informations collaborateur. -->
```

## Directive / Composant : `UserPopover` (Angular)
Affiche un popover d’informations sur un collaborateur depuis un déclencheur (par exemple un avatar ou un texte cliquable). Les sélecteurs Angular exacts (directive ou composant) ne sont pas publiés dans les stories accessibles.

### Valeurs (si directive avec valeurs)
Les valeurs, variantes ou alias de sélecteur ne sont pas documentés dans les stories publiques.

```html
<!-- Référez-vous à la story Angular "Popover / Basic" pour le sélecteur et les valeurs disponibles. -->
```

## Inputs
Les inputs publics, leurs types exacts et valeurs par défaut ne sont pas exposés dans les stories consultables. Référez-vous au code source ou à la section "Source" de la story Angular pour la liste exhaustive.

```html
<!-- Exemple indicatif : se référer à la story pour les noms d'inputs et leurs types -->
<!-- <element [someInput]="user" ...>Déclencheur</element> -->
```

## Patterns courants

### Survol d’un avatar dans un tableau
```html
<!-- Déclencheur de popover sur un avatar dans une cellule de tableau -->
<!-- Voir la story Angular pour le sélecteur exact -->
<!-- <lu-user-picture ... [user]="user" [luUserPopover]="user"></lu-user-picture> -->
```

### Clic sur le nom du collaborateur dans une liste
```html
<!-- Popover déclenché au clic sur le nom -->
<!-- <a href (click)="..." [luUserPopover]="user">Prénom Nom</a> -->
```

### Densité élevée dans une grille
```html
<!-- Afficher le popover pour désambiguïser plusieurs entrées similaires -->
<!-- <span [luUserPopover]="user">Prénom N.</span> -->
```

## Accessibilité
- Le déclencheur du popover doit être accessible au clavier (focusable) et activable via Entrée/Espace.
- Gérer le focus à l’ouverture et à la fermeture du popover; retourner le focus sur le déclencheur à la fermeture.
- Fournir une annonce ARIA cohérente (role et aria-label/aria-describedby) pour décrire le contenu du popover.
- S’assurer que le popover reste dans le flux de navigation (piégeage du focus si nécessaire) et respecte le contraste requis pour tous les textes et liens.
- Éviter que l’ouverture au survol empêche l’usage clavier; prévoir un déclenchement explicite au focus/clic.

## Guidelines Prisme
- Utiliser le popover pour une consultation rapide; ne pas y placer d’actions lourdes ou de formulaires complexes.
- Préférer un déclencheur clair et identifiable (avatar, nom complet).
- Ne pas dupliquer des informations déjà présentes à proximité; le popover doit compléter, pas répéter.