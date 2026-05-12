# Élévations

# Principes

## **Types d’élévation**

### **Sunken**

C’est la plus basse élévation disponible. Elle est utilisée pour créer un renfoncement permettant d’accueillir d’autres contenus, dans le but de les mettre en avant ou d’appuyer leur interactivité.

Il s’agit du style :`--pr-t-elevation-surface-sunken`

### **Default**

Il s’agit de l’arrière-plan par défaut des interfaces Lucca.

Il s’agit du tokens :`--pr-t-elevation-surface-default`

### **Raised**

C’est le niveau d’élévation des composant interactifs comme les cards. Ce sont des éléments d’interface sur lesquels l’utilisateur peut interagir (survoler, cliquer, etc.)

Ce niveau d’élévation combine les tokens :`--pr-t-elevation-surface-raised``--pr-t-elevation-shadow-raised`

Au survol, ce niveau d’élévation reprend les tokens :`--pr-t-elevation-surface-raised``--pr-t-elevation-shadow-overlay`

<notes>

## 

</notes>

### **Overflow**

L'overflow indique que le contenu a défilé en-dessous d’une surface. Il peut être utilisé pour le défilement vertical ou horizontal. Il est utilisé pour les composants comme le banner ou le footer, mais aussi pour le défilement horizontal de certains tableaux.

Il s’agit du token :`--pr-t-elevation-shadow-overflow`

### **Overlay**

C’est le niveau d’élévation le plus haut possible. Il est réservé à des éléments qui se superposent au reste de l’interface, comme les dialogs, dropdowns, popovers, etc.

Ce niveau d’élévation combine les tokens :`--pr-t-elevation-surface-raised``--pr-t-elevation-shadow-overlay`

Un backdrop s’ajoute automatiquement à l’ouverture d’une dialog. Il s’agit d’une ombre de la taille de la zone d’affichage.

Ce niveau d’élévation porte le token :`--pr-t-elevation-surface-backdrop`

À noter que ce token n'existe pas sur Figma puisque le backdrop est directement porté parle composant Dialog.

### Button

Les boutons utilisent un tokens d'élévation spécifique. Ce token s'applique aux Button et aux Filter pills.

Il s’agit du tokens :`--pr-t-elevation-shadow-button`

---

## Comportement

### Simuler une réelle élévation

Pour les composants interactifs comme la Card ou la Notch box, l’agrandissement aussi bien en hauteur qu’en largeur, associé à une ombre plus vaste et plus diffuse permet de simuler son élévation avec efficacité. La Card seule s’agrandit, son contenu non.

- **Do** : Les composants et éléments interactifs s'agrandissent au survol. L'ombre change pour indiquer une élévation différente.
- **Don't** : Au survol, les composants interactifs ne doivent ni garder la même ombre, ni la même taille.

# Tokens

## Tokens élévations

### Surface

| Token | Valeur |
| :--- | :--- |
| `--pr-t-elevation-surface-raised` | #FFFFFF / Neutral 0 |
| `--pr-t-elevation-surface-default` | #F3F6FC / Neutral 25 |
| `--pr-t-elevation-surface-sunken` | #E7EDF9 / Neutral 50 |

### Shadows

| Token | Valeur |
| :--- | :--- |
| `--pr-t-elevation-shadow-raised` | `0 0 0 1px color-mix(in srgb, var(--palettes-neutral-400) 8%, transparent), 0 1px 2px color-mix(in srgb, var(--palettes-neutral-400) 40%, transparent), 0 2px 4px color-mix(in srgb, var(--palettes-neutral-400) 20%, transparent)` |
| `--pr-t-elevation-shadow-overflow` | `0 0 0 1px color-mix(in srgb, var(--palettes-neutral-400) 8%, transparent), 0 0 4px color-mix(in srgb, var(--palettes-neutral-400) 32%, transparent), 0 0 8px color-mix(in srgb, var(--palettes-neutral-400) 24%, transparent)` |
| `--pr-t-elevation-shadow-overlay` | `0 0 0 1px color-mix(in srgb, var(--palettes-neutral-400) 8%, transparent), 0 4px 8px color-mix(in srgb, var(--palettes-neutral-400) 24%, transparent), 0 4px 12px 2px color-mix(in srgb, var(--palettes-neutral-400) 8%, transparent)` |
