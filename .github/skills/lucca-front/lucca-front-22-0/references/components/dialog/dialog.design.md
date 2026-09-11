# dialog — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/841b0b)

# Design

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

1. **Header** : Titre et bouton de fermeture.
2. **Conteneur** : Contenu personnalisable.
3. **Footer** : Boutons d'action.

## Options

### Couleur de fond

Le choix de la couleur de fond du conteneur s'adapte à la complexité de son contenu :

**Fond blanc** (`-pr-t-elevation-surface-raised`) : à utiliser lorsque le contenu est simple et linéaire (ex. : formulaire court, message de confirmation).

**Fond gris** (`-pr-t-elevation-surface-default`) : à utiliser uniquement lorsque le contenu est complexe, c'est-à-dire qu'il nécessite d'être structuré en plusieurs sections ou qu'il intègre des blocs visuellement distincts (ex. : résumé, liste, formulaire combiné).

### Horizontal navigation

L'intégration d'une HorizontalNavigation dans l’entête permet de catégoriser des informations denses au sein d'un même contexte, tout en restant fixe lors du défilement du contenu pour garantir une navigation rapide.

Les onglets ont un URL commun.

## Règle d’utilisation

### Positionnement des actions

#### Action générique

Certaines ressources portent régulièrement des actions génériques comme l’archivage, la duplication ou la suppression. Un bouton ouvrant un menu contextuel est disponible depuis l’entête de la Dialog.

Si une seule action est disponible, elle doit aussi être placée dans un menu contextuel, elle ne doit ni être affichée comme un bouton textuel, ni positionné dans le Footer de la Dialog.

- **Don't** : Les actions génériques ne doivent pas être présentées dans le Footer de la Dialog.
- **Don't** : L’action de suppression ne doit pas être affiché dans le Footer.

#### Actions métiers

Les actions métier doivent être positionnées dans le Footer de la Dialog, en respectant les règles d’ordre d’affichage définit dans la guideline du composant Button.

## Cas d’usage

### Création et édition d’un objet

Pour créer ou modifier une ressource, il faut utiliser le mode `drawer`.

Si le processus se déroule en plusieurs étapes, un ProgressStepper peut être intégré directement dans l’entête.

Pour en savoir plus sur ce cas d’usage consulter le pattern du cycle de vie d'une ressource.

### Comportement responsive

Dans le cadre d’une création ou d’une édition d’objet sur petit écran, utilisez systématiquement le mode `drawer-from-bottom`.

### Dialog de confirmation

À utiliser pour interrompre l’utilisateur lorsqu’il s’apprête à effectuer une action ayant un impact important. Les dialogs de confirmation ajoutent une friction volontaire afin d’éviter les erreurs, en lui demandant de confirmer explicitement son intention.

Les règles spécifiques à ce cas d’usage sont disponibles dans le pattern Dialog de confirmation.

### Fancy dialog

En fin de parcours complexe, l’apparition d’une FancyDialog permet de féliciter l’utilisateur et de lui récapituler ce qu’il s’est passé tout en le guidant vers ce qu’il peut faire ensuite.

# Content

Mots-clés : boîte de dialogue, popin, modal, confirmation

## Titre

Le titre contient le message principal de manière concise et spécifique. 

L’utilisateur y trouve de suite la réponse à la question “Qu’est-ce que le logiciel Lucca me propose de faire maintenant ?” Ou “À propos de quel sujet m’informe-t-on ?”

### Recommandations

* Reprenons les 1 ou 2 mots-clefs de l'écran précédent, décrivant l’action qui a ouvert cette Dialog.
* Nous ne mettons pas de point au titre. Les points d’exclamation sont déconseillés, pour éviter un ton alarmiste.
* Le titre débute par un verbe à l’infinitif dans la plupart des cas. Utilisons la formule **{verbe à l'infinitif} + {objet}**.
* Si vous souhaitez attirer l'attention sur une action décisive et complexe à expliciter avec la formule {verbe} + {objet}, le titre peut être formulé **comme une phrase** ("Vous avez désactivé des applications Lucca", "Votre recherche ne donne aucun résultat").

### Exemples

**Des** **messages standards de confirmation** **applicables à la Dialog sont disponibles dans la section Contenu.**

| ✅ | ❌ |
| --- | --- |
| Confirmer la suppression de la dépense | Veuillez confirmer votre action.     Dépense sur le point d’être supprimée ! |
| Créer une campagne | Création de la campagne à lancer  |
| Ajouter un centre de coût | Centre de coût |
| Comprendre vos soldes | Les soldes ne vont plus avoir de secret pour vous ! |
| Valider des augmentations | Vos augmentations à valider |
| Feuille de temps de Valentin Bresnier - Février 2023 | Voici la feuille de temps de Valentin Bresnier :  |
| Votre recherche ne donne aucun résultat  | Oups, pas de résultats !  Aucun résultat |
| "Population” et “acteurs” : comment ça marche  Comprendre les notions "population" et "acteur" | Population et acteurs |
| Vous avez désactivé des applications dans vos contrats | Des applications n'ont pas été choisies |

*Rappel : nous vouvoyons toujours l’utilisateur.* 

*Pas de “Mon”, “Ma”, “Mes”.*

## Bouton d’action

### Recommandations

* Lorsqu'il lit l’intitulé du bouton, l'utilisateur sait aussitôt ce qui se passe au clic d'un bouton.
* Si notre titre de dialog répond bien aux critères mentionnés (“Qu’est-ce que le logiciel Lucca me propose de faire maintenant ?”), alors reprenons l’intitulé du titre en bouton, en utilisant la formule **{verbe} + {objet}**.
* L’intitulé du bouton peut tout à fait reprendre le titre du panel.
* Consulter nos recommandations générales sur Button.

Pour en savoir plus sur les actions dans les Dialogs, vous pouvez consulter la guideline dédiée au Footer.
