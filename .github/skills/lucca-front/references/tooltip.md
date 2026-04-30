# pr-Tooltip

## Quand utiliser ce composant
- Afficher une aide brève pour expliquer une icône d’action ou un libellé ambigu
- Donner la signification d’une abréviation ou d’un acronyme sans alourdir l’interface
- Dévoiler un libellé complet lorsqu’un texte est tronqué (ellipsis) par manque de place

## Stories Storybook
- Documentation complète: https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs

## Composant Figma
- Figma: https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5639-31388
- Description visuelle: Infobulle légère qui apparaît au survol/focus d’un élément déclencheur pour fournir une aide contextuelle.
- Variantes disponibles: pr-Tooltip

## Import

```typescript
// Aucun composant ou directive Angular documenté pour pr-Tooltip dans @lucca-front/ng
// Référez-vous aux packages Overlays de Lucca Front si un wrapper Angular est publié ultérieurement.
```

## Usage de base

```html
<!-- Aucun sélecteur Angular public documenté pour pr-Tooltip dans @lucca-front/ng.
Si un wrapper Angular est disponible (par ex. une directive de type [luTooltip]),
référez-vous à ses stories Angular pour l’utilisation. -->
```

## Directive / Composant : `luTooltip` (non documenté) 
Aucune directive ou composant Angular officiel documenté pour ce Tooltip dans les données fournies. Si une directive de type attribut est publiée (ex. [luTooltip] sur un élément interactif), elle s’appliquerait généralement sur des éléments inline ou interactifs (icône, lien, bouton) et gérerait l’affichage de l’infobulle au survol/focus.

### Valeurs (si directive avec valeurs)
Non documenté.

```html
<!-- Exemple non contractuel, à titre indicatif si une directive venait à exister
<element [luTooltip]="'Texte de l’info'">Déclencheur</element>
-->
```

## Inputs
Aucun input Angular public documenté.

## Patterns courants

### Aide sur icône d’action
```html
<!-- Fournir un libellé d’aide court sur une icône lorsque l’intitulé n’est pas visible -->
<!-- Si un wrapper Angular est disponible, associez-le à l’élément déclencheur -->
```

### Dévoiler un libellé tronqué
```html
<!-- Sur un texte ellipsé, l’infobulle permet d’afficher le contenu complet sans rompre la mise en page -->
```

### Définir une abréviation
```html
<!-- Expliquer une abréviation sans encombrer l’interface principale -->
```

## Accessibilité
- Associer l’infobulle à son déclencheur via aria-describedby et un id sur l’élément role="tooltip"
- Le contenu doit apparaître au focus clavier et disparaître proprement au blur/escape, pas uniquement au survol souris
- Ne pas piéger le focus à l’intérieur d’un tooltip purement informatif; éviter le contenu interactif
- Contraster suffisamment le texte; laisser un délai suffisant pour la lecture tout en évitant qu’il masque des éléments essentiels

## Guidelines Prisme
- Utiliser un texte court, précis et non redondant avec le libellé existant
- Ne pas révéler des informations critiques ou des erreurs via un tooltip (utiliser plutôt une aide persistante ou un message d’erreur)
- Préférer l’apparition au survol et au focus; éviter l’apparition au simple passage du curseur sur des éléments non interactifs