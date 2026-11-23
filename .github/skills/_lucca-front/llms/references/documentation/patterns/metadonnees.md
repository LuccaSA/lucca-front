# Métadonnées

# Content

## Anatomie

Quel que soit le conteneur, les métadonnées forment un groupe unique, porté par un **Listing** `inline`, composé de deux éléments :

* **Donnée** : chaque métadonnée est un item du Listing en `pr-t-color-text-subtle`.
* **Séparateur** : un Divider vertical entre chaque donnée.

## Quel composant pour quelle métadonnée ?

Chaque type d'information a une représentation attitrée. Nous réutilisons le composant prévu plutôt que de créer une variante.

| Type de catégorie | Composant associé | Exemples |
| --- | --- | --- |
| Statut | **StatusBadge** | En cours, Validé, Brouillon, Archivé, Session à démarrer |
| Logiciel | **SoftwareIcon + Nom du logiciel ou SoftwareIconWrapper** | Lucca Core HR, Lucca Expenses, Lucca Training |
| Priorité ou importance | **Icône + Libellé** | Urgent, Normal, Faible |
| Langue | **Libellé** | FR, EN, ES |
| Domaine fonctionnel / métier | **Tag** | RH, Finance, Formation |
| Type de contenu ou objet | **Tag** | Document, Rapport, Session, Objectif |
| Équipe ou groupe concerné | **Libellé** | Équipe commerciale, Équipe technique, Direction |
| Autres catégories | **Tag** | Conformité légale, Conseil du moment |
| Localisation / Pays / Établissement | **Libellé** | France, Suisse, Site ou établissement spécifique, Émetteur |
| Date / temps | **Libellé** | Créé le…, Actif depuis le…, Session du… au…, Dernière synchronisation le… |
| Auteur, responsable, collaborateurs concernés | **Avatar ou Libellé** | Manager : Marie Bragoulet |

## Cas d’usage

### Page header

Le PageHeader présente l'objet principal de la page : c'est le conteneur de référence pour les métadonnées.

* **Statut** : toujours à droite du titre, via un StatusBadge, lorsqu'il constitue une information clé à percevoir au premier coup d'œil.
* **Informations complémentaires** (sous-titre, description, dates) : sous le titre, en premier.
* **Métadonnées** : sous les informations complémentaires, sur une ligne dédiée.

Nous regroupons les métadonnées qui partagent le même sens ou le même but, plutôt que de les disperser.

### Entête d'une dialog

L’entête de Dialog reprend la logique du PageHeader dans un espace plus contraint : le StatusBadge se place à droite du titre, et le groupe de métadonnées s'affiche sous le titre.

La Dialog étant un contexte focalisé sur une action, nous limitons le groupe aux métadonnées indispensables à la compréhension de l'objet.

### Ressource card

Sur une ResourceCard, l'espace est contraint : la disposition des métadonnées s'adapte selon le mode appliqué.

Pour un affichage en liste (`stacked`), le StatusBadge et les Tags reste aligné à droite du titre. Le groupe de métadonnées s'affiche en dessous, sur une ligne.

Pour un affichage en grille (`grid`), le StatusBadge et les Tags glisse sous le titre afin de ne pas tronquer le nom de la ressource. Le groupe de métadonnées s'empile en dessous.

### Widget

Dans un Widget, les métadonnées sont séparées du contenu principal par un Divider horizontal et viennent se placer dans la zone inférieure.

## Comportement

### Ordre du groupe

Les données doivent être affichées par ordre d’importance. **Le Tag se place toujours en premier dans le groupe**, avant les représentations en libellé et les avatars. Lorsque plusieurs Tags cohabitent, ils restent groupés en tête de ligne.

### **Libellé**

Le libellé porte le sens : il prend la forme « Label : Valeur » (ex. *Établissement : Lucca Paris*), et se suffit à lui-même.

⚠️ Nous n'ajoutons pas d'icône devant une métadonnée : elle n'apporte rien à la compréhension et alourdit une ligne déjà dense.

- **Do** : Affichons les métadonnées en libellé seul.
- **Don't** : N'ajoutons pas d'icône devant le libellé.

### Débordement

Si le nombre de métadonnées est trop important pour pouvoir toutes les afficher, les métadonnées supplémentaires sont masquées derrière un **« + X »** placé en fin de ligne, qui ouvre une **Popover** listant les métadonnées masquées.

Un paramètre permet de définir le nombre de métadonnées affichées avant le « **+ X** ». Nous le fixons en fonction de la place réellement disponible dans le conteneur.
