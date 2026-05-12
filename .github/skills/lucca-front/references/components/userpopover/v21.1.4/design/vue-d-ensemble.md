# userpopover — Vue d'ensemble

## **Anatomie**

<notes>

1. Avatar
2. Identité cliquable
3. Intitulé de poste
4. Département
5. Lieu de travail / Présence ou absence cliquable

</notes>

---

## **Options et permissions**

### **Avatar**

Si le collaborateur n’a pas de photo, ce sont les initiales qui sont affichées.

### **Accès au trombinoscope**

Si l’utilisateur a accès au trombinoscope, le lien renvoie sur le Dossier RH. En revanche si l’utilisateur n’a accès ni au trombinoscope, ni au Dossier RH, alors le prénom et le nom ne sont pas interactifs.

### **Visibilité du poste**

Si l’utilisateur n’a pas accès au poste du collaborateur, alors celui-ci n’est pas affiché.

### **Accès au planning**

#### **Accès à Lucca Office et Lucca Absences ou Lucca Office seulement**

Si le collaborateur a renseigné son Lucca Office, le lieu de travail ainsi que la zone, si le site est divisé en zones, alors tout est indiqué.

Si rien n’est renseigné dans Lucca Office, alors la mention “Non renseigné” est indiquée.

Lorsque le collaborateur est absent, la mention “Absent(e)” est indiquée ainsi que la date de fin de l’absence.

Cette ligne d’information est cliquable et redirige l’utilisateur vers le planning **Lucca Office**.

#### **Accès à Lucca Absences seulement**

Lorsque le collaborateur est absent, la mention “Absent(e)” est indiquée ainsi que la date de fin de l’absence.

Si le collaborateur n’est pas absent alors le mention “Présent(e)” est indiquée.

Cette ligne d’information est cliquable et redirige l’utilisateur vers le planning **Lucca Absences**.

#### **Accès ni à Lucca Office, ni à Lucca Absences**

La ligne mentionnant le lieu de travail ou la présence/absence n’est pas affichée.

#### Futurs et anciens collaborateurs

Dans le cas d’un futur collaborateur, la mention “Arrivée prévue le”, suivie de la date de début de contrat, est indiquée.

S’il s’agit d’un collaborateur ayant quitté l’entreprise, alors le mention “Parti(e)” est indiquée.

Cette ligne d’information n’est pas cliquable.

---

## **Comportement**

### **Affichage**

L’affichage se fait au survol de l’avatar, du nom du collaborateur ou deux éléments. Le délai d’affichage est de **300ms** mais celui-ci peut être modifié en fonction du contexte et de l’interface.

Un article sur [NNGroup](https://www.nngroup.com/articles/timing-exposing-content/) détaille la durée d’affichage des contenus masqués.

### **Une taille fixe**

La largeur du composant est fixé à 360px. Celle-ci reste toujours la même, peu importe le contenu, qu’il soit plus petit ou plus grand.

Lorsque le nom du collaborateur ou du site est long, il se trouve tronqué. L’information complète est visible via un Tooltip au survol.

---

## **Exemples d'utilisation**

- **Do** : Le User popover peut être utilisé dans un Index table ou Data table pour apporter plus de précision sur un collaborateur.
- **Do** : De la même manière, il est possible de l'utiliser sur le prénom/nom d'un collaborateur.
- **Do** : Le User popover peut s'afficher sur le prénom/nom d'un collaborateur mais aussi directement sur un Avatar.
- **Don't** : N'utilisons pas le User popover dans des composants comme le Select. Cela n'apporte pas une information utile au bon moment et perturbe l'expérience utilisateur.
