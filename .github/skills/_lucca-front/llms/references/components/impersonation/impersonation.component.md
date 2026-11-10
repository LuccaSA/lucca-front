# impersonation — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-navigation-impersonation-angular-basic--docs)

## Angular

Component selector : `lu-impersonation`

### Imports et configuration

Pour utiliser le composant `lu-impersonation`, vous devez l'importer dans votre composant :

### Utilisation basique

Le composant affiche un bouton avec le profil utilisateur actuellement actif. En cliquant dessus, une liste déroulante s'ouvre pour sélectionner un autre utilisateur.

#### Entrées (inputs)

- **`selectedUser`** (model `ILuUser`): L'utilisateur actuellement sélectionné pour l'impersonification. Peut être modifié via `[(selectedUser)]` ou `[selectedUser]`. **Attention: la valeur par défaut doit être l'utilisateur actuellement connecté, aucune valeur nullable n'est acceptée**

- **`enableFormerEmployees`** (boolean, défaut: `false`): Permet d'inclure les anciens employés dans la liste de sélection lorsque la valeur est définie à `true`.

- **`intl`** (object): Les traductions du composant. Accepte les clés suivantes:
  - `switchProfile`: Texte du bouton principal (par défaut : "Changer de profil")
  - `a11yNavigationDescription`: Description pour l'accessibilité (par défaut : "Utiliser les flèches haut/bas pour naviguer")
  - `clear`: Libellé du bouton d'effacement (par défaut : "Effacer")
  - Ainsi que toutes les traductions du sélecteur utilisateur (`luCoreSelectUserTranslations`)

#### Sorties (outputs)

- **`clear`**: Émis lorsque l'utilisateur clique sur le bouton d'effacement pour réinitialiser la sélection, il est recommandé de s'en servir pour effectuer un reset côté BU, en remplaçant `selectedUser` par l'utilisateur en cours.

### Personnalisation des traductions

Si vous souhaitez personnaliser les traductions, vous pouvez fournir vos propres valeurs :

### Basic

```js
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { luCoreSelectUserTranslations, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent, luImpersonationTranslations } from '@lucca-front/ng/impersonation';
```

```html
<lu-impersonation [(selectedUser)]="example" (clear)="example = me; onClear()" />

<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```

## HTML/CSS

Classe CSS : `.impersonation`

### Basic

```css
@forward '@lucca-front/scss/src/components/impersonation';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<div class="impersonation">
	<button type="button" class="impersonation-trigger" aria-expanded="false" aria-controls="popover-content-0">
		<span class="pr-u-mask">Switch profile:</span>
		<div class="avatar mod-softRounded mod-S">
			<div class="avatar-picture" style="background-color: rgb(92, 214, 200)">
				<span translate="no" class="avatar-picture-initials">DP</span>
			</div>
		</div>
		Durand Pierre
		<span class="pr-u-mask">– Page content updates as soon as this filter is changed</span>
		<span class="impersonation-trigger-icon">
			<span aria-hidden="true" class="lucca-icon icon-chevronBottom"></span>
		</span>
	</button>
	<button class="clear impersonation-clear">
		<span class="pr-u-mask">Back to default profile</span>
	</button>
</div>
```
