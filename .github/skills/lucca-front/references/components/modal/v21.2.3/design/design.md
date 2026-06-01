# modal — Design

🚧 Modal utilise aujourd'hui le nouveau service Dialog par défaut. Il est prévu de la conserver en tant qu'outil permettant de créer rapidement une fenêtre de dialogue et sera ainsi renommée dans le futur.

<design figma-url="https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/?node-id=5640:33370">

**pr-Dialog**

**pr-Dialog**

</design>

## Accessibilité

Les recommandations concernent les modales qui nécessitent le blocage de l’arrière-plan en termes d’intéraction. Cela implique l’impossibilité de naviguer dans le body en dehors de la modale, le focus est contenu dans la modale :

* Les retours se basent sur le [pattern utilisé par le W3C](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)
* La modale ne constitue pas un changement de contexte. Cela signifie qu’il n’est pas nécessaire de simuler un rechargement de la page, le titre de la page ne doit pas être changé

### Ouverture, fermeture et focus :

* Les modales sont toujours ouvertes par des boutons,
* Déplacer le focus sur la fenêtre à son ouverture,
* La tabulation doit être encapsulée dans la modale : on ne retourne jamais dans l’écran qui se trouve en arrière-plan,
* Ajouter un `tabindex=-1` au header qui prendra le focus dès l’ouverture de la modale,
* Il est possible de rajouter un `role="document"` au header pour signifier à l’utilisateur qu’il peut utiliser les touches de navigation dans le contenu par exemple,
* Il faut ajouter l’attribut `aria-hidden="true"` au contexte en arrière-plan de la modale pour qu’il ne soit pas restitué au lecteur d’écran. Cet attribut ne doit pas être ajouté à un parent où est contenu la modale
* La touche Echap permet de refermer la modale,
* Replacer le focus sur le bouton d’ouverture à la fermeture des modales.

### Contenu de la modale :

* Les titres de modales doivent être en `<h1>`,
* Il faut associer les titres des modales au container de la modale, via l’attribut `aria-labelledby`,
* Le bouton de fermeture des modales doit être positionné avant le titre de la modale,
* Les attributs `role="dialog"` et `aria-modal="true"` doivent être ajoutés à la première `<div>` contenu dans la modale.

## UX writing

L'utilisateur doit interagir avec la modale avant de pouvoir revenir à la fenêtre principale. Il est sorti de son contexte initial. Pour respecter la [loi de Miller](https://lawsofux.com/millers-law/), il est donc important de rappeler ce contexte à l’intérieur-même de la modale.

| ✅ | ❌ |
| --- | --- |
| Confirmer la suppression de la dépense « Restaurant ». | Voulez-vous confirmer cette action ? |

### Titre

#### Explicite

Le titre doit rendre explicite la raison pour laquelle la modale est ouverte.

| ✅ | ❌ |
| --- | --- |
| Préciser le motif du refus | Refuser la demande |

#### À l'infinitif

Le titre débute par un verbe à l’infinitif, sauf dans le cas d'une modale en lecture seule (qui ne portera pas d'action principale).

| ✅ | ❌ |
| --- | --- |
| Modifier la valeur du paramétrage | Valeur du paramétrage par établissement |

#### Succint

Le titre respecte dans la mesure du possible un nombre maximum de 50 caractères. L’idéal est qu’il reste affiché sur une ligne seulement en version *desktop*, et sur deux en version mobile. Cette recommandation ne s’applique que dans le cas où la modale contient du contenu.

#### Titre ≠ phrase

Un titre n'est pas une phrase, sauf si la modale ne contient pas de contenu.

#### Pas de forme interrogative

La forme interrogative est à proscrire dans le titre, sauf si la modale n'a pas de contenu associé.

| ✅ (Lorsque la modale rappelle le contexte)  | ❌ (Sauf si la modale n'a pas de contenu) |
| --- | --- |
| Supprimer ce profil d'acquisition | Voulez-vous supprimer le profil d'acquisition 30 CP - ouvrable ? |

#### Pas de ponctuation

| ❌ |
| --- |
| Supprimer cette dépense ? |
| Pas si vite ! |

#### Contexte

Le titre a le droit de supposer du contexte si le contenu apporte des précisions.

| ✅ (Lorsque la modale rappelle le contexte) |
| --- |
| Supprimer cette version |

### Contenu

#### Donner une raison

Le contenu doit clarifier la raison de la présence de la modale dans le cas où cette modale ajoute une étape à l'action qu'on voulait initialement réaliser.

#### Expliquer les conséquences

Le contenu doit expliquer la conséquence d'une action ou son absence de conséquence.

#### Contenu et titre

Le contenu doit vivre sans son titre mais ne doit pas être redondant avec celui-ci. Le cas échéant, on peut s'abstraire du contenu.

### Boutons d'appel à l'action

Le bouton doit expliciter la conséquence de son action.

| ✅ | ❌ |
| --- | --- |
| Enregistrer les modifications | Valider |

Le bouton doit être le plus explicite possible.

| ✅ | ❌ |
| --- | --- |
| Sélectionner 6 collaborateurs  | Sélectionner (6) |

Les boutons d'action primaires contiennent toujours un verbe d'action.

*Ex. "Refuser", "Supprimer", "Confirmer", etc.*

"Continuer" permet de signifier qu'on rentre dans un tunnel. Il n'entraine pas d'action d'enregistrement, qui devrait être explicitée ("Enregistrer et continuer").

| ✅ | ❌ |
| --- | --- |
| Continuer > Continuer > Enregistrer / Publier | Suivant |

### Boutons secondaires

#### Annuler

"Annuler" permet d'annuler tout un processus. Il n'a de sens que dans le cas où il est associé à un bouton d'action ou d'enregistrement.

| ✅ |
| --- |
| Bouton principal : Modifier les valeurs personnalisées Bouton secondaire : Annuler |

#### Fermer

"Fermer" n'existe que dans le cadre d'une modale de lecture seule. Il suppose qu'il n'y a pas de bouton d'action associé.

| ✅ | ❌ |
| --- | --- |
| Titre : Rapport d’import  Bouton secondaire : Fermer | Titre : Modifier les valeurs personnalisées  Bouton secondaire : Fermer |

#### Ignorer

"Ignorer" est exclusivement utilisé dans un contexte où la complétion de la modale est optionnelle.

*Ex. Modale d’ajout de commentaire.*
