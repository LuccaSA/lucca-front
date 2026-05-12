# color-picker — Design

## Anatomie

<notes>

1. **Label :** Le label du champ est obligatoirement “Couleur”
2. **Champ de saisie :** l’utilisateur clique pour afficher la palette de couleurs qu’il peut choisir. Lorsqu’une couleur est sélectionnée, elle apparait ici, avec ou sans son nom.
3. **Menu déroulant :** il contient la liste de toutes les couleurs sélectionnables. Le nom de la couleur se met à jour lorsque l’utilisateur navigue à la souris ou au clavier.

</notes>

---

## Options

### Version par défaut

Conçue pour offrir plus de clarté, elle affiche à la fois l’aperçu et le nom de la couleur sélectionnée.

### Version compacte

Idéale pour les interfaces où l’espace est limité, elle affiche uniquement l’aperçu de la couleur. Le nom de la couleur reste visible dans le panel de sélection.

---

## Palettes

### Couleurs décoratives par défaut

Un Color picker doit utiliser **les couleurs décoratives**. Ce sont les palettes transverses à tous les logiciels Lucca, utilisées pour notamment pour le composant Tag.

Choisissez des nuances homogènes : toutes les nuances en 500, 400, 300. Les couleurs portent le nom des couleurs décoratives (Ananas, Citrouille, Lagon…).

Si plusieurs nuances d’une même palette sont sélectionnables alors nous spécifions “Foncé” ou “Clair” à côté de la couleur (Ananas - Clair).

### Grille

Les couleurs sont rangées par lignes de six. Si le nombre de couleurs n’est pas multiple de six, les options restent positionnées sur la grille.

### Bordures

Les couleurs affichées dans le Color picker doivent correspondre à leur rendu réel dans l'interface. Si l'interface affiche des couleurs avec bordures, le Color picker doit présenter ces mêmes couleurs avec leurs bordures, permettant à l'utilisateur de voir précisément le résultat de sa sélection.

- **Don't** : Ne mélangeons pas les couleurs avec et sans bordures.
- **Don't** : Ne mélangeons pas des nuances claires et sombres.
