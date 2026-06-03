# Couleurs

# Product

## **Utilisation**

Le nuancier “Product” correspond à la couleur principale du produit.

Il en existe une par gamme de produit : Spend Management, Time and Activities, Talent Management, Compensation and Benefits, Cloud Control, Employee Administration).

Ce nuancier définit donc le produit et permet de hiérarchiser l’information sur l’interface, notamment via les actions.

### **Actions**

La Product 700 est utilisée pour les actions principales (boutons, liens, etc.) ainsi que pour les éléments d’interactions comme les Checkboxes ou les Radios. Pour les interactions, on utilisera le Product 800 au survol et la 900 pour l’état “*active*”.

Cette couleur est utilisée pour guider l’utilisateur sur l’interface, sur ce qu’il doit y faire.

### **Arrière-plans**

La Product 50 peut-être utilisée pour les arrière-plans, notamment sur une ligne sélectionnée dans un tableau. Comme le reste du nuancier Produit, elle sert à guider l’oeil de l’utilisateur sur où il se trouve et ce qu’il doit faire. La Product 100 est utilisée au survol de ces éléments.

### Configuration CSS

*Lucca Front* propose une configuration permettant d'appliquer la couleur du produit sur les différents composants ainsi qu'une sélection des palettes chargées, afin de réduire le poids du fichier CSS final.

Par défaut, la couleur produit est le orange Lucca. Il est possible de remplacer cette palette par une couleur produit, fournie par Lucca Front :

```css
@use '@lucca-front/scss/src/commons/config' with (
	$product: 'cleemy', /* pagga | timmi | poplee | cc | coreHR */
);
```

Cette palette sera accessible via un lot de variables CSS (`--palettes-product-700`), une classe palette (`.palette-product`), ainsi qu'un lot d'utilitaires.

#### **Palettes produits supplémentaires**

Il est possible de charger une ou plusieurs palettes produits supplémentaires :

```css
@use '@lucca-front/scss/src/commons/config' with (
	$palettesOtherProduct: ('pagga', 'timmi', 'poplee', 'cc', 'coreHR'), /* 'all' pour sélectionner toutes les palettes */
);
```

Ces palettes seront accessibles via un lot de variables CSS (`--palettes-pagga-700`), une classe palette (`.palette-pagga`) applicable sur certains composants et via un jeu d'utilitaires.

## **Palettes**

### **Lucca**

### **Spend Management**

### **Cloud Control**

### **Compensation and Benefits**

### **Talent Management**

### **Time and Activities**

### **Employee Administration**

# Neutral

## **Utilisation**

Le nuancier “*Neutral*” est omniprésent dans les interfaces : arrière-plans, textes, bordures. Il ne sert pas particulièrement à mettre en avant des informations et reste très en retrait en comparaison du nuancier “*Product*”.

### **Arrière-plans**

Pour en savoir plus sur l'utilisation du nuancier Neutral pour les arrières-plan, vous pouvez regarder la guideline Élévations.

### **Bordures**

Neutral 200 est utilisée pour les bordures qui servent à construire les interfaces (Divider, Data table, etc.).

Pour apporter plus de contraste, les champs de formulaires (Textfield, Select, etc.) utilisent une bordure en Neutral 300 (Neutral 400 au survol). Des tokens spécifiques aux champs de formulaire existent.

### **Textes**

Pour en savoir plus sur l'application du nuancier Neutral sur les textes, vous pouvez vous référer à la guideline dédiée à la typographie.

## **Palette**

# Semantics

## **Utilisation**

Les couleurs jouent un rôle essentiel dans la communication visuelle des interfaces utilisateur. Nous assignons des significations génériques à un ensemble de couleurs nommées “Semantics” pour garantir une expérience cohérente pour les utilisateurs.

* Le nuancier **Success** utilise la couleur verte, couramment utilisée pour représenter les informations de succès dans les interfaces utilisateur. Elle est associée à des notions telles que la réussite, la validation et l'approbation et est utilisée en ce sens dans les interfaces Lucca.
* Le nuancier **Warning** se base sur la couleur orange. Cette couleur est souvent utilisée pour représenter des informations de mise en garde ou d'avertissement dans les interfaces utilisateur. L'utilisation du orange pour mettre en évidence des éléments importants permet aux utilisateurs de se focaliser sur des informations ou des actions qui nécessitent une attention particulière.
* Le nuancier **Critical** utilise la couleur rouge souvent utilisée pour représenter des informations d'erreur, d'avertissement ou d'échec dans les interfaces utilisateur. Elle est associée à des notions telles que le danger, l'erreur ou l'invalidité. L'utilisation du rouge permet de signaler des problèmes, des erreurs ou des actions incorrectes aux utilisateurs de manière visuellement saisissante. La couleur rouge attire l'attention et crée une sensation d'urgence, incitant les utilisateurs à prendre des mesures pour corriger les erreurs ou éviter les problèmes.

### **Accessibilité**

Il est essentiel d’associer ces couleurs sémantiques avec un texte explicatif ou une icône claire pour assurer une compréhension universelle. Cela garantit que les utilisateurs ayant des difficultés à distinguer les couleurs puissent également comprendre la signification de manière précise.

## **Palettes**

### **Success**

### **Warning**

### **Critical**

# Decoratives

## **Utilisation**

Les couleurs Decoratives jouent un rôle important au sein de notre palette visuelle, tant du point de vue esthétique que fonctionnel.

Elles revêtent une importance capitale dans la catégorisation des données, que l’on retrouve de diverses façon sur les interfaces Lucca (graphiques, dashboard, tag, etc.). Ainsi, ces couleurs ajoutent une couche de signification supplémentaire à notre design, permettant aux utilisateurs de rapidement identifier et associer des informations, tout en contribuant à l'attrait esthétique global de nos produits.

C’est couleurs ne peuvent pas vivre sans explication et doivent être systématiquement liées à une légende (texte, icône ou les deux).

### Configuration CSS

Toutes les palettes décoratives sont chargées par défaut. Afin d'alléger le poids du CSS en provenance de Lucca Front, il est possible de les retirer ou de n'appeler que celles nécessaires :

```css
@use '@lucca-front/scss/src/commons/config' with (
	$palettesDecorative: ('mint', 'watermelon'),
);
```

Ces palettes seront accessibles via un lot de variables CSS (`--palettes-mint-700`), une classe palette (`.palette-mint`) applicable sur certains composants et un via jeu d'utilitaires.

## **Palettes**

### **Kiwi**

### **Lime**

### **Cucumber**

### **Mint**

### **Glacier**

### **Lagoon**

### **Blueberry**

### **Lavender**

### **Grape**

### **Watermelon**

### **Pumpkin**

### **Pineapple**

# Accessibilité

## **Accessibilité**

Dans le cadre des recommandations sur l’accessibilité, nous avons travaillé à la création d’une grille de contraste. Cette dernière permet d’établir une liste de contrastes entre deux couleurs suffisamment bons pour être utilisés dans nos interfaces.

Cette grille à pour but d’aider les designers lors de la conception, notamment des composants et est valable pour l’ensemble des couleurs “Product” ce qui garanti une homogénéité.

## Grilles

### **Neutral vs Product**

### **Product vs Product**

### Neutral vs Neutral

# Tokens

## Text

| Token | Valeur |
| --- | --- |
| `--pr-t-color-text` | Neutral 800 |
| `--pr-t-color-text-heading` | Neutral 900 |
| `--pr-t-color-text-subtle` | Neutral 600 |
| `--pr-t-color-text-highlight` | Neutral 900 |
| `--pr-t-color-text-reverse` | Neutral 0 |
| `--pr-t-color-text-success` | Success 700 |
| `--pr-t-color-text-warning` | Warning 700 |
| `--pr-t-color-text-critical` | Critical 700 |

## Input

| Token | Valeur |
| --- | --- |
| `--pr-t-color-input-background` | Neutral 0 |
| `--pr-t-color-input-background-critical` | Critical 50 |
| `--pr-t-color-input-background-disabled` | Neutral 100 |
| `--pr-t-color-input-border` | Neutral 300 |
| `--pr-t-color-input-border-hover` | Neutral 400 |
| `--pr-t-color-input-border-critical` | Critical 400 |
| `--pr-t-color-input-border-critical-hover` | Critical 600 |
| `--pr-t-color-input-text` | Neutral 800 |
| `--pr-t-color-input-text-placeholder` | Neutral 400 |
| `--pr-t-color-input-text-placeholder-critical` | Critical 400 |
| `--pr-t-color-input-text-suffix` | Neutral 600 |
| `--pr-t-color-input-text-disabled` | Neutral 700 |
| `--pr-t-color-input-icon` | Neutral 600 |
| `--pr-t-color-input-icon-disabled` | Neutral 500 |
