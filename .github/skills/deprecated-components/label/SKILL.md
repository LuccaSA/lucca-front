---
name: label
description: 'Migre le composant déprécié Label (`.label`) de Lucca Front vers NumericBadge, StatusBadge ou Tag, en suivant les guidelines Prisme. Lance le schematic `lu-label`, relit son rapport, traite les cas qu’il n’a pas convertis et les surcharges SCSS. Use when migrating deprecated `.label` usages, when someone says « migrer les labels », « label déprécié », or when a lucca-front-migrate-22-x skill finds `.label` left in a project.'
---

# label

Ce skill migre les usages du composant déprécié **Label** (`.label`) vers les composants Prisme qui le remplacent :

- `lu-numeric-badge` (`@lucca-front/ng/numeric-badge`) — un décompte ;
- `lu-status-badge` (`@lucca-front/ng/status-badge`) — le statut d’une ressource ;
- `lu-tag` (`@lucca-front/ng/tag`) — une catégorie, un mot-clé.

Le schematic `lu-label` fait l’essentiel : il convertit même en cas de doute et consigne chaque décision dans un rapport. Ce skill relit ce rapport, tranche les cas laissés de côté et nettoie le SCSS.

La référence complète des règles du schematic est dans [references/schematic.md](./references/schematic.md). La lire avant l’Étape 3.

---

## Règles

- **Les guidelines Prisme font foi**, pas l’ancien rendu. En cas de doute sur une cible ou une palette, lire la page du composant ([NumericBadge](https://prisme.lucca.io/94310e217/p/0548ef-numericbadge), [StatusBadge](https://prisme.lucca.io/94310e217/p/425d98), [Tag](https://prisme.lucca.io/94310e217/p/6036ad-tag)).
- **Poser la question au dev** quand ni le code ni la guideline ne permettent de trancher. Ne jamais deviner une intention.
- **Jamais de Chip** : elle est interactive, le Label ne l’est pas.
- Pas de refacto d’opportunité : on migre les Labels, rien d’autre. Les pistes repérées en chemin vont dans le rapport.

---

## Étape 1 — Prérequis et inventaire

1. Vérifier que le schematic est disponible dans la version installée : `lu-label` doit figurer dans `node_modules/@lucca-front/ng/schematics/collection.json`. Sinon, la version de Lucca Front est trop ancienne : s’arrêter et le dire.
2. Vérifier que le projet importe le CSS du Label (`@lucca-front/scss/src/components/label`, `…/src/components` ou `…/src/main-all`). Sinon, les `.label` du projet ne sont pas des Labels Prisme : rien à migrer.
3. Compter les occurrences de `class="… label …"` dans les templates Angular, pour donner un ordre de grandeur au dev.

## Étape 2 — Schematic

```bash
npx ng g @lucca-front/ng:lu-label --dryRun
npx ng g @lucca-front/ng:lu-label
```

Le premier passage montre les fichiers touchés sans rien écrire. Le second applique la migration et produit `lu-label-migration-report.md` à la racine du projet.

## Étape 3 — Relecture du rapport

Traiter les lignes dans cet ordre.

### Lignes `not converted`

| Raison | Traitement |
|---|---|
| palette sémantique sans signal de statut | Demander au dev si le Label porte le statut de la ressource. Oui → `lu-status-badge`. Si c’est un message (phrase, erreur de formulaire, avertissement) → proposer `lu-inline-message` et vérifier sa guideline. Sinon → `lu-tag` `neutral`. |
| Label interactif (`(click)`, `routerLink`, `href` sur le Label) | Aucune cible n’est interactive. Demander au dev : retirer l’interaction, ou la porter par un bouton / un lien à côté du badge. |
| palette dynamique complexe (plusieurs conditions, `[ngClass]`, `[class]`) | Lister toutes les valeurs possibles. Si l’une est sémantique, la cible est StatusBadge (palettes autorisées : `neutral`, `product`, `warning`, `error`, `success`). Écrire un seul `[palette]="…"`, au besoin via un `computed` dans le composant. |
| contenu complexe sur un `mod-number` | Le nombre va dans le NumericBadge, le texte passe à côté. Si c’est en fait un libellé (« 3 jours restants »), proposer Tag ou StatusBadge. Une icône est retirée, ou le Label devient un Tag si elle porte du sens. |
| `label` ajouté dynamiquement (`[class.label]`, `[ngClass]`) | Migrer à la main en appliquant les mêmes règles que le schematic. |

### Lignes `low`

- **Tag issu de `product` ou sans palette** : vérifier que ce n’est pas un statut « en cours ». Si oui, passer en `lu-status-badge palette="product"`.
- **Fallback HTML** : vérifier qu’un composant Angular n’est vraiment pas utilisable (le HTML imbriqué n’est parfois qu’un `<span>` ou un `<strong>` sans valeur ajoutée). Si c’est possible, passer au composant.
- **Icône retirée d’un StatusBadge** : signaler la perte au dev ; la guideline n’autorise que le point et le texte.

### Lignes `high`

Pas de relecture systématique. Les lister comme écrans à contrôler visuellement.

## Étape 4 — Surcharges SCSS

Chercher dans les `.scss` / `.css` du projet les sélecteurs `.label` (et `.label-icon`, `.label.mod-*`) et les variables `--components-label-*`.

- **Proposer de supprimer** chaque surcharge : le composant cible suit déjà la guideline.
- Ne garder que les besoins de mise en page (marges, positionnement), réécrits sur le nouveau composant (`.numericBadge`, `.statusBadge`, `.tag`) ou remplacés par des utilitaires `pr-u-*`.
- Ne jamais supprimer sans l’accord du dev une surcharge dont le sélecteur peut viser autre chose qu’un Label Prisme.

## Étape 5 — Import CSS du Label

S’il ne reste plus aucun `.label` dans les templates, retirer l’import `@lucca-front/scss/src/components/label`. Ne pas toucher aux imports `components` et `main-all`.

## Étape 6 — Vérification

Lancer le build et le lint du projet. Les erreurs préexistantes, non liées à la migration, sont listées et non corrigées.

## Étape 7 — Rapport

Rendre une section **Label** :

- **Labels migrés** : nombre par cible (NumericBadge, StatusBadge, Tag, fallback HTML).
- **À contrôler visuellement** : fichier et ligne, en commençant par les lignes `low`.
- **Laissés en l’état** : fichier, ligne et raison.
- **Surcharges SCSS** : supprimées, ou conservées avec la raison.
- **Imports CSS** : `statusBadge` / `tag` ajoutés pour le fallback HTML, import du Label retiré ou non.
- **Pistes hors périmètre** repérées en chemin.

Supprimer ensuite `lu-label-migration-report.md` : il ne doit pas être commité.

---

## Depuis un skill `lucca-front-migrate-22-x`

Un skill de migration de version ne réimplémente pas cette migration. S’il reste des `.label` dans le projet, il propose de lancer ce skill et intègre sa section **Label** dans son propre rapport final.

## Installation dans un projet consommateur

Avec [APM](https://microsoft.github.io/apm/), dans `apm.yml` :

```yaml
dependencies:
  apm:
    - LuccaSA/lucca-front/.github/skills/deprecated-components/label
```

puis `apm install`. Retirer le skill une fois la migration terminée.
