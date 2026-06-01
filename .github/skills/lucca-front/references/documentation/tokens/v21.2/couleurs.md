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

### Lucca

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #FFF1EB |   |
| Product.100 | #FFE0D1 |   |
| Product.200 | #FFCCB3 |   |
| Product.300 | #FFBE9E |   |
| Product.400 | #FFAA80 |   |
| Product.500 | #FF9361 |   |
| Product.600 | #FF7B3D |   |
| Product.700 | #E06029 |   |
| Product.800 | #AE2E03 |   |
| Product.900 | #611405 |   |

### Spend Management

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #ECF9F7 |   |
| Product.100 | #CEEEE9 |   |
| Product.200 | #A4E0DA |   |
| Product.300 | #7ACDC6 |   |
| Product.400 | #54BBB2 |   |
| Product.500 | #00A39C |   |
| Product.600 | #009491 |   |
| Product.700 | #007A78 |   |
| Product.800 | #00545C |   |
| Product.900 | #00333D |   |

### Cloud Control

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #FEECF4 |   |
| Product.100 | #FCD9E9 |   |
| Product.200 | #F9B9D7 |   |
| Product.300 | #F49FC7 |   |
| Product.400 | #F084B7 |   |
| Product.500 | #E864A1 |   |
| Product.600 | #D63882 |   |
| Product.700 | #BC2069 |   |
| Product.800 | #930747 |   |
| Product.900 | #580B2F |   |

### Compensation and Benefits

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #FBEFFA |   |
| Product.100 | #F5DBF4 |   |
| Product.200 | #EBC1E9 |   |
| Product.300 | #E1A8DF |   |
| Product.400 | #DA8BD6 |   |
| Product.500 | #D16BCC |   |
| Product.600 | #C94CC5 |   |
| Product.700 | #B413AC |   |
| Product.800 | #86147E |   |
| Product.900 | #61005C |   |

### Talent Management

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #E6F6FE |   |
| Product.100 | #CBEAFB |   |
| Product.200 | #B1DEF6 |   |
| Product.300 | #98D2F1 |   |
| Product.400 | #7BC3EA |   |
| Product.500 | #48ABE0 |   |
| Product.600 | #2B8FC5 |   |
| Product.700 | #0B77B1 |   |
| Product.800 | #005685 |   |
| Product.900 | #24075A |   |

### Time and Activities

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #F0F1FE |   |
| Product.100 | #E0E1FF |   |
| Product.200 | #CAC9FD |   |
| Product.300 | #B9B2FA |   |
| Product.400 | #A69DF0 |   |
| Product.500 | #9989EC |   |
| Product.600 | #866CE4 |   |
| Product.700 | #6F52D1 |   |
| Product.800 | #5027A5 |   |
| Product.900 | #24075A |   |

### Employee Administration

| Token | Value | Description |
| --- | --- | --- |
| Product.50 | #E6F2FE |   |
| Product.100 | #CBE3FB |   |
| Product.200 | #B0D3F7 |   |
| Product.300 | #96C4F3 |   |
| Product.400 | #78B2ED |   |
| Product.500 | #5EA3E8 |   |
| Product.600 | #3387DB |   |
| Product.700 | #0C63BB |   |
| Product.800 | #004285 |   |
| Product.900 | #002E5C |   |

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

| Token | Value | Description |
| --- | --- | --- |
| Color.Neutral.0 | #FFFFFF |   |
| Color.Neutral.25 | #F3F6FC |   |
| Color.Neutral.50 | #E7EDF9 |   |
| Color.Neutral.100 | #DBE3F5 |   |
| Color.Neutral.200 | #CED9EE |   |
| Color.Neutral.300 | #BECBE4 |   |
| Color.Neutral.400 | #ACBBD7 |   |
| Color.Neutral.500 | #8396B9 |   |
| Color.Neutral.600 | #586A8D |   |
| Color.Neutral.700 | #445473 |   |
| Color.Neutral.800 | #2A3551 |   |
| Color.Neutral.900 | #0B1732 |   |

# Semantics

## **Utilisation**

Les couleurs jouent un rôle essentiel dans la communication visuelle des interfaces utilisateur. Nous assignons des significations génériques à un ensemble de couleurs nommées “Semantics” pour garantir une expérience cohérente pour les utilisateurs.

* Le nuancier **Success** utilise la couleur verte, couramment utilisée pour représenter les informations de succès dans les interfaces utilisateur. Elle est associée à des notions telles que la réussite, la validation et l'approbation et est utilisée en ce sens dans les interfaces Lucca.
* Le nuancier **Warning** se base sur la couleur orange. Cette couleur est souvent utilisée pour représenter des informations de mise en garde ou d'avertissement dans les interfaces utilisateur. L'utilisation du orange pour mettre en évidence des éléments importants permet aux utilisateurs de se focaliser sur des informations ou des actions qui nécessitent une attention particulière.
* Le nuancier **Critical** utilise la couleur rouge souvent utilisée pour représenter des informations d'erreur, d'avertissement ou d'échec dans les interfaces utilisateur. Elle est associée à des notions telles que le danger, l'erreur ou l'invalidité. L'utilisation du rouge permet de signaler des problèmes, des erreurs ou des actions incorrectes aux utilisateurs de manière visuellement saisissante. La couleur rouge attire l'attention et crée une sensation d'urgence, incitant les utilisateurs à prendre des mesures pour corriger les erreurs ou éviter les problèmes.

### **Accessibilité**

Il est essentiel d’associer ces couleurs sémantiques avec un texte explicatif ou une icône claire pour assurer une compréhension universelle. Cela garantit que les utilisateurs ayant des difficultés à distinguer les couleurs puissent également comprendre la signification de manière précise.

## **Palettes**

### Success

| Token | Value | Description |
| --- | --- | --- |
| Color.Success.50 | #DBFAE0 |   |
| Color.Success.100 | #BEF3C7 |   |
| Color.Success.200 | #A2EBAF |   |
| Color.Success.300 | #84E695 |   |
| Color.Success.400 | #68D97B |   |
| Color.Success.500 | #57C769 |   |
| Color.Success.600 | #39B155 |   |
| Color.Success.700 | #279B42 |   |
| Color.Success.800 | #0A762E |   |
| Color.Success.900 | #004D20 |   |

### Warning

| Token | Value | Description |
| --- | --- | --- |
| Color.Warning.50 | #FFF2DB |   |
| Color.Warning.100 | #FFE9C2 |   |
| Color.Warning.200 | #FFDB9E |   |
| Color.Warning.300 | #FFD080 |   |
| Color.Warning.400 | #FFC35C |   |
| Color.Warning.500 | #FFB13D |   |
| Color.Warning.600 | #FF9D00 |   |
| Color.Warning.700 | #F08800 |   |
| Color.Warning.800 | #C25100 |   |
| Color.Warning.900 | #802A00 |   |

### Critical

| Token | Value | Description |
| --- | --- | --- |
| Color.Critical.50 | #FFEBEC |   |
| Color.Critical.100 | #FFD2D4 |   |
| Color.Critical.200 | #FDBEBE |   |
| Color.Critical.300 | #FAA3A3 |   |
| Color.Critical.400 | #FA8989 |   |
| Color.Critical.500 | #F76E6E |   |
| Color.Critical.600 | #F15050 |   |
| Color.Critical.700 | #DA2F2F |   |
| Color.Critical.800 | #AA0E0E |   |
| Color.Critical.900 | #630303 |   |

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

| Token | Value | Description |
| --- | --- | --- |
| Kiwi.50 | #ECF7DE |   |
| Kiwi.100 | #D7EEB9 |   |
| Kiwi.200 | #C7E79C |   |
| Kiwi.300 | #AED57C |   |
| Kiwi.400 | #96C856 |   |
| Kiwi.500 | #7CBB2A |   |
| Kiwi.600 | #68A716 |   |
| Kiwi.700 | #4F840B |   |
| Kiwi.800 | #3E6808 |   |
| Kiwi.900 | #2D4B06 |   |

### **Lime**

| Token | Value | Description |
| --- | --- | --- |
| Lime.50 | #E2F7DF |   |
| Lime.100 | #C5EEBE |   |
| Lime.200 | #A7E69E |   |
| Lime.300 | #88D57C |   |
| Lime.400 | #74CB67 |   |
| Lime.500 | #54BA45 |   |
| Lime.600 | #45A437 |   |
| Lime.700 | #1C7C0E |   |
| Lime.800 | #16600B |   |
| Lime.900 | #104508 |   |

### **Cucumber**

| Token | Value | Description |
| --- | --- | --- |
| Cucumber.50 | #DDF9EB |   |
| Cucumber.100 | #C0F2D9 |   |
| Cucumber.200 | #98ECC2 |   |
| Cucumber.300 | #71DAA6 |   |
| Cucumber.400 | #54C98F |   |
| Cucumber.500 | #2DB973 |   |
| Cucumber.600 | #12A55C |   |
| Cucumber.700 | #008A45 |   |
| Cucumber.800 | #006B36 |   |
| Cucumber.900 | #005229 |   |

### **Mint**

| Token | Value | Description |
| --- | --- | --- |
| Mint.50 | #D9F7F1 |   |
| Mint.100 | #BBF2E7 |   |
| Mint.200 | #99EBDA |   |
| Mint.300 | #68D9C3 |   |
| Mint.400 | #31C4A6 |   |
| Mint.500 | #0FB392 |   |
| Mint.600 | #089B7E |   |
| Mint.700 | #008A6E |   |
| Mint.800 | #006B56 |   |
| Mint.900 | #004D3D |   |

### **Glacier**

| Token | Value | Description |
| --- | --- | --- |
| Glacier.50 | #E0F6F6 |   |
| Glacier.100 | #C4EDED |   |
| Glacier.200 | #A1E3E3 |   |
| Glacier.300 | #73D3D3 |   |
| Glacier.400 | #4DC7C7 |   |
| Glacier.500 | #20B6B6 |   |
| Glacier.600 | #08A0A0 |   |
| Glacier.700 | #008A8A |   |
| Glacier.800 | #006B6B |   |
| Glacier.900 | #005252 |   |

### **Lagoon**

| Token | Value | Description |
| --- | --- | --- |
| Lagoon.50 | #DFF3FB |   |
| Lagoon.100 | #BFE7F8 |   |
| Lagoon.200 | #9FDAF4 |   |
| Lagoon.300 | #75C7EA |   |
| Lagoon.400 | #49B5E4 |   |
| Lagoon.500 | #28A3D7 |   |
| Lagoon.600 | #148EC2 |   |
| Lagoon.700 | #086C96 |   |
| Lagoon.800 | #065374 |   |
| Lagoon.900 | #05425C |   |

### **Blueberry**

| Token | Value | Description |
| --- | --- | --- |
| Blueberry.50 | #DFE8FB |   |
| Blueberry.100 | #C8D8F9 |   |
| Blueberry.200 | #B1C8F6 |   |
| Blueberry.300 | #98B4EB |   |
| Blueberry.400 | #769BE5 |   |
| Blueberry.500 | #628CDF |   |
| Blueberry.600 | #4777D7 |   |
| Blueberry.700 | #295CC2 |   |
| Blueberry.800 | #1B4498 |   |
| Blueberry.900 | #153575 |   |

### **Lavender**

| Token | Value | Description |
| --- | --- | --- |
| Lavender.50 | #EADFFB |   |
| Lavender.100 | #DFCDF9 |   |
| Lavender.200 | #D3BBF7 |   |
| Lavender.300 | #C3A8EB |   |
| Lavender.400 | #B493E6 |   |
| Lavender.500 | #A17CDA |   |
| Lavender.600 | #9165D2 |   |
| Lavender.700 | #7647BD |   |
| Lavender.800 | #5F369B |   |
| Lavender.900 | #470B60 |   |

### **Grape**

| Token | Value | Description |
| --- | --- | --- |
| Grape.50 | #F5E3FC |   |
| Grape.100 | #EED0FB |   |
| Grape.200 | #E9C2F9 |   |
| Grape.300 | #D4A6E8 |   |
| Grape.400 | #BA84D2 |   |
| Grape.500 | #AD71C6 |   |
| Grape.600 | #9A57B7 |   |
| Grape.700 | #8133A3 |   |
| Grape.800 | #620F85 |   |
| Grape.900 | #470B60 |   |

### **Watermelon**

| Token | Value | Description |
| --- | --- | --- |
| Watermelon.50 | #F7DEE4 |   |
| Watermelon.100 | #F1C1CD |   |
| Watermelon.200 | #EAA4B5 |   |
| Watermelon.300 | #E48BA1 |   |
| Watermelon.400 | #DB6683 |   |
| Watermelon.500 | #D4496C |   |
| Watermelon.600 | #BE2D51 |   |
| Watermelon.700 | #A7163A |   |
| Watermelon.800 | #8D0729 |   |
| Watermelon.900 | #6F0620 |   |

### **Pumpkin**

| Token | Value | Description |
| --- | --- | --- |
| Pumpkin.50 | #FDECD8 |   |
| Pumpkin.100 | #FBDDBC |   |
| Pumpkin.200 | #F9CF9F |   |
| Pumpkin.300 | #F4B771 |   |
| Pumpkin.400 | #EF9C3E |   |
| Pumpkin.500 | #EB8E24 |   |
| Pumpkin.600 | #DB7500 |   |
| Pumpkin.700 | #C26700 |   |
| Pumpkin.800 | #8F4C00 |   |
| Pumpkin.900 | #5C3100 |   |

### **Pineapple**

| Token | Value | Description |
| --- | --- | --- |
| Pineapple.50 | #FEF7D7 |   |
| Pineapple.100 | #FBF1B6 |   |
| Pineapple.200 | #FAE999 |   |
| Pineapple.300 | #F9E16C |   |
| Pineapple.400 | #F8DC4F |   |
| Pineapple.500 | #E7C623 |   |
| Pineapple.600 | #D6B300 |   |
| Pineapple.700 | #B89600 |   |
| Pineapple.800 | #8A7000 |   |
| Pineapple.900 | #665400 |   |

# Accessibilité

## **Accessibilité**

Dans le cadre des recommandations sur l’accessibilité, nous avons travaillé à la création d’une grille de contraste. Cette dernière permet d’établir une liste de contrastes entre deux couleurs suffisamment bons pour être utilisés dans nos interfaces.

Cette grille à pour but d’aider les designers lors de la conception, notamment des composants et est valable pour l’ensemble des couleurs “Product” ce qui garanti une homogénéité.

## Grilles

### **Neutral vs Product**

<design figma-url="https://www.figma.com/design/i5JVSEVXAUyXiDewcxWGRp/?node-id=208:3446">

</design>

### **Product vs Product**

<design figma-url="https://www.figma.com/design/i5JVSEVXAUyXiDewcxWGRp/?node-id=208:3605">

</design>

### Neutral vs Neutral

<design figma-url="https://www.figma.com/design/i5JVSEVXAUyXiDewcxWGRp/?node-id=208:3740">

</design>

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
| `--pr-t-color-input-background-disabled` | Neutral 50 |
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
