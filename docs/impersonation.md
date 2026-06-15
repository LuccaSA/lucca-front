# Impersonation

`lu-impersonation` est un composant qui permet aux utilisateurs de basculer rapidement vers un autre profil utilisateur. Il est particulièrement utile dans les applications administratives ou de support client où les utilisateurs doivent pouvoir filtrer ou observer avec un autre profil utilisateur.

## Imports et configuration

Pour utiliser le composant `lu-impersonation`, vous devez l'importer dans votre composant :

```tsx
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';

@Component({
  selector: 'my-component',
  imports: [ImpersonationComponent],
  template: `...`
})
export class MyComponent {
  // ...
}
```

## Utilisation basique

Le composant affiche un bouton avec le profil utilisateur actuellement actif. En cliquant dessus, une liste déroulante s'ouvre pour sélectionner un autre utilisateur.

```html
<lu-impersonation [(selectedUser)]="selectedUser" />
```

## Propriétés et sortie

### Entrées (inputs)

- **`selectedUser`** (model `ILuUser`): L'utilisateur actuellement sélectionné pour l'impersonification. Peut être modifié via `[(selectedUser)]` ou `[selectedUser]`. **Attention: la valeur par défaut doit être l'utilisateur actuellement connecté, aucune valeur nullable n'est acceptée**

- **`enableFormerEmployees`** (boolean, défaut: `false`): Permet d'inclure les anciens employés dans la liste de sélection lorsque la valeur est définie à `true`.

- **`intl`** (object): Les traductions du composant. Accepte les clés suivantes:
  - `switchProfile`: Texte du bouton principal (par défaut : "Changer de profil")
  - `a11yNavigationDescription`: Description pour l'accessibilité (par défaut : "Utiliser les flèches haut/bas pour naviguer")
  - `clear`: Libellé du bouton d'effacement (par défaut : "Effacer")
  - Ainsi que toutes les traductions du sélecteur utilisateur (`luCoreSelectUserTranslations`)

### Sorties (outputs)

- **`clear`**: Émis lorsque l'utilisateur clique sur le bouton d'effacement pour réinitialiser la sélection, il est recommandé de s'en servir pour effectuer un reset côté BU, en remplaçant `selectedUser` par l'utilisateur en cours.

## Personnalisation des traductions

Si vous souhaitez personnaliser les traductions, vous pouvez fournir vos propres valeurs :

```tsx
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { LU_IMPERSONATION_TRANSLATIONS } from '@lucca-front/ng/impersonation';

@Component({
  selector: 'app-user-menu',
  imports: [ImpersonationComponent],
  providers: [
    {
      provide: LU_IMPERSONATION_TRANSLATIONS,
      useValue: {
        switchProfile: 'Sélectionner un utilisateur',
        a11yNavigationDescription: 'Naviguer avec les flèches',
        clear: 'Réinitialiser',
        // + autres traductions du sélecteur utilisateur
      }
    }
  ],
  template: `<lu-impersonation [(selectedUser)]="user" />`
})
export class MyComponent {
  // ...
}
```
