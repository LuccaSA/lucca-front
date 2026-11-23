# Niveaux de navigation

**Sommaire**

- Content
  - Ordre d'usage des composants
  - Accès à un logiciel
    - Banner
  - Accès à une fonctionnalité principale
    - SideNavigation
    - Card
  - Accès au contenu interne d'une ressource
    - HorizontalNavigation
    - VerticalNavigation
  - Accès à une liste de ressources
    - IndexTable
    - CardWrapper
  - Accès à un autre mode d'affichage
    - SegmentedControl
  - Navigation interne à un contenu
    - Link
    - Button
    - Breadcrumb et BackButton
  - Règles transverses
    - Ne pas cacher les actions critiques
    - Valider le périmètre

# Content

| Besoin | Composant recommandé |
| --- | --- |
| Accès à un logiciel | **Banner** |
| Accès à une fonctionnalité principale | **SideNavigation / Card** |
| Accès au contenu interne d'une ressource | **HorizontalNavigation / VerticalNavigation** |
| Accès à une liste de ressources | **IndexTable / CardWrapper** |
| Accès à un autre mode d'affichage | **SegmentedControl** |
| Redirections ponctuelles | **Link / Button / Breadcrumb / BackButton** |

## Ordre d'usage des composants

Les composants doivent être utilisés dans cet ordre :

Banner → Side navigation → Card → Horizontal navigation → Vertical navigation

⚠️ Certains niveaux peuvent être sautés, mais **l'ordre d'utilisation suivant ne doit jamais être inversé.**

## Accès à un logiciel

### Banner

Le banner est une navigation permettant d'accéder aux logiciels ou aux paramètres partagés du menu avatar. Toujours visible, elle ne porte aucune logique métier et ne dépend pas de la structure du logiciel.

## Accès à une fonctionnalité principale

Composants utilisés pour organiser le périmètre métier d'un logiciel et accéder aux fonctionnalités principales.

### SideNavigation

La SideNavigation structure l'ensemble fonctionnel du logiciel, pour faciliter l’accès aux fonctionnalités principales, régulièrement utilisées pour de représenter un processus métier.

#### **Structure**

* **NavSideItem** : entrée directe vers une fonctionnalité principale.
* **NavSideSubItem** : regroupement de sous-fonctionnalités par domaine métier cohérent.

**N'utilisons pas la SideNavigation pour :**

* afficher des ressources comparables (IndexTable ou CardWrapper),
* présenter des états ou filtres de ressources (SegmentedControl),
* un 3ᵉ niveau de navigation (Card).

### Card

La Card permet un accès à des **sous-fonctionnalités du logiciel** lorsque la SideNavigation atteint ses limites et pour orienter l'utilisateur grâce à des titres, descriptions ou visuels.

**N'utilisons pas la Card pour :**

* présenter des ressources similaires (IndexTable ou CardWrapper),
* accéder à des fonctionnalités récurrentes (SideNavigation),
* compléter une page qui a déjà une HorizontalNavigation.

## Accès au contenu interne d'une ressource

Ici, les composants sont utilisés pour structurer le contenu d'une **ressource** ou d'une **fonctionnalité** lorsque celle-ci comporte plusieurs **attributs** ou **sous-ressource**.

### HorizontalNavigation

L’HorizontalNavigation permet de structurer un contenu en plusieurs **sections principales (5 sections maximum)**. À utiliser en première intention pour structurer un contenu, ou pour accéder aux sections, attributs ou paramètres d'une ressource ou d'une fonctionnalité.

**N'utilisons pas l'HorizontalNavigation pour :**

* structurer plus de 5 sections (VerticalNavigation),
* présenter des statuts ou vues de ressources (IndexTable + FilterBar),
* placer des actions fréquentes derrière les sections (challenger le découpage en amont).

### VerticalNavigation

Utilisons la VerticalNavigation pour structurer un contenu en de **nombreuses sections** ou en **sections hiérarchisées**. Elle convient au-delà de 5 sections à structurer, lorsqu'un second niveau est nécessaire dans certaines sections, ou pour donner accès à des sections distinctes plutôt qu'à de simples ancres.

**N'utilisons pas la VerticalNavigation pour :**

* afficher des ressources comparables (IndexTable),
* présenter des états ou vues de ressources (IndexTable + FilterBar),
* présenter les paramètres d'une même ressource (HorizontalNavigation),
* placer des actions fréquentes derrière les sections (challenger le découpage en amont).

## Accès à une liste de ressources

Ces composants sont utilisés pour présenter des **ressources de même nature** qui donnent accès à un détail (page ou Dialog).

### IndexTable

Utilisons un IndexTable pour un usage orienté **comparaison** et **efficacité**. À utiliser en première intention pour présenter des ressources similaires, des listes longues ou à volumétrie variable, comparer ou filtrer sur des attributs, ou agir sur plusieurs ressources en même temps.

**N'utilisons pas l'IndexTable pour :**

* afficher des ressources qui nécessitent une description (CardWrapper),
* afficher des ressources différentes et non comparables (Card).

#### **Patterns particuliers**

ApprobationInbox : pour des ressources à traiter ou à approuver.

### CardWrapper

Utilisons le CardWrapper pour les listes de ressources nécessitant un guidage visuel ou textuel. À utiliser pour présenter des ressources de type **catalogue**.

**N'utilisons pas le CardWrapper pour :**

* des listes longues ou à volumétrie variable (IndexTable)
* accéder à une sous-fonctionnalité plutôt qu'à une ressource (Card)

## Accès à un autre mode d'affichage

### SegmentedControl

Le SegmentedControl est un composant permettant de **changer la vue** d'un même ensemble de ressources ou d'un même contenu. C'est **une bascule locale**, pas une navigation structurelle. À utiliser pour proposer des états filtrés simples, prévisibles et constants, modifier l'ordre des attributs ou changer les attributs mis en avant, changer de mode d'affichage (ex. tableau vs graphique).

**N'utilisons pas le SegmentedControl pour :**

* afficher des ressources issues de bases de données différentes (HorizontalNavigation),
* basculer entre des affichages dont les filtres changent : ce sont des sections distinctes (HorizontalNavigation).

## Navigation interne à un contenu

Ces composants ne constituent pas un niveau de navigation : ils déclenchent une redirection ponctuelle depuis le contenu. Cette section résume leur rôle, leurs guidelines dédiées font référence.

### Link

Utilisons le Link pour rediriger l'utilisateur vers une page différente de celle affichée.

Nous ajoutons une icône `arrow-external` pour informer l’utilisateur qu’il sera redirigé vers un nouveau contexte de navigation (onglet ou fenêtre).

* Un lien renvoyant vers un autre logiciel Lucca, peut, ou non, se faire dans un nouveau contexte.
* Un lien renvoyant vers un domaine extérieur s'ouvre systématiquement dans un nouveau contexte de navigation.

**N'utilisons pas le Link pour :**

* déclencher une action ou ouvrir un formulaire (Button),
* remonter dans une hiérarchie fonctionnelle (Breadcrumb ou BackButton).

### Button

Utilisons le Button pour ouvrir une ressource ou un formulaire dans une page ou une Dialog.

Un Button peut porter l'icône `arrow-external` quand l'action se poursuit dans un outil tiers : c'est l'action qui fait le Button, pas le fait de rester dans le logiciel.

**N'utilisons pas le Button pour :**

* une simple redirection sans action associée (Link),
* remonter dans une hiérarchie fonctionnelle (Breadcrumb ou BackButton).

### Breadcrumb et BackButton

Le Breadcrumb et le BackButton ne se cumulent jamais. Choisissons celui qui correspond à la profondeur réelle de la page.

#### **BackButton**

À utiliser pour revenir au niveau parent de la page courante quand celle-ci n'a qu'un seul niveau de profondeur : l'utilisateur sait d'où il vient, exposer le chemin n'apporte rien.

**N'utilisons pas le BackButton pour :**

* naviguer vers une page sans lien hiérarchique (Link),
* déclencher une action (Button).

#### **Breadcrumb**

Pour se situer dans l'application et remonter de plusieurs niveaux d'un coup.À utiliser dès qu'il existe plusieurs niveaux de profondeur (ex. Accueil > Section > Sous-section > Page courante).

**N'utilisons pas le Breadcrumb pour :**

* un seul niveau de profondeur (BackButton).

## Règles transverses

### Ne pas cacher les actions critiques

Une action critique ne doit pas être placée derrière :

* un onglet ou une section,
* une vue de SegmentedControl.

### Valider le périmètre

Une navigation trop profonde ou trop éclatée n'est pas toujours un problème de composant : elle peut signaler un découpage fonctionnel mal posé en amont (une fonctionnalité qui regroupe des choses trop différentes, ou une ressource qui porte des sous-parties qui devraient être autonomes).

Avant d'ajouter un niveau de navigation supplémentaire pour absorber cette complexité, se poser la question : « **Cette complexité aurait-elle pu être évitée en revoyant le découpage, plutôt qu'en changeant de composant ?** »
