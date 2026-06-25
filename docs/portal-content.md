`PortalContent` est un type utilisé pour définir du contenu dynamique (texte, template ou composant) au sein de Lucca Front.

Bien qu'il soit rendu en interne via la directive `luPortal`, son usage principal pour les développeurs se situe au niveau des **inputs** de nombreux composants de la librairie (ex: `PageHeader`, `Callout`, `EmptyState`, etc.).

Le besoin de départ est de pouvoir accepter une valeur simple (exemple : un titre sous forme de `string`) tout en offrant la flexibilité d'utiliser un `ng-template` ou un composant pour des rendus plus complexes (ajout d'icônes, de boutons, de tooltips, etc.).

### PortalContent

Le type `PortalContent<T>` signifie qu'un input peut accepter :

- `string` : Le texte sera rendu tel quel.
- `TemplateRef<T>` : Un template Angular qui sera instancié avec un contexte de type `T`.
- `Type<unknown>` : Un composant Angular qui sera instancié dynamiquement.

#### Exemple avec une chaîne de caractères (usage simple)
La plupart du temps, on passe simplement une chaîne de caractères.

```angular2html
<lu-page-header label="Mon titre"></lu-page-header>
```

#### Exemple avec un TemplateRef
Si vous avez besoin d'un rendu spécifique, vous pouvez passer une référence de template.

```angular2html
<lu-page-header [label]="myTpl"></lu-page-header>

<ng-template #myTpl>
  <span class="u-textProduct">Titre</span> personnalisé
</ng-template>
```

#### Exemple avec un Composant
Pour des cas plus complexes ou réutilisables, vous pouvez passer une classe de composant.

```typescript
import { MyCustomHeaderComponent } from './my-custom-header.component';

@Component({
  template: `<lu-page-header [label]="headerComponent"></lu-page-header>`
})
export class ExampleComponent {
  headerComponent = MyCustomHeaderComponent;
}
```

### Contexte et Injection

Lorsque vous utilisez un template ou un composant, vous pouvez souvent leur passer des données (le "contexte").

#### Pour les templates
Le contexte est accessible via les variables `let-` du template.

#### Pour les composants
Le contexte est injecté via `PORTAL_CONTEXT`.

```typescript
import { Component, inject } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';

@Component({
  standalone: true,
  template: `Valeur reçue : {{ context.someValue }}`
})
export class MyDynamicComponent {
  protected context = inject(PORTAL_CONTEXT) as { someValue: string };
}
```

---

### Directive luPortal (Usage Interne à LF)

La directive `luPortal` est l'outil technique qui permet de consommer un `PortalContent`. Elle est principalement utilisée à l'intérieur des composants de Lucca Front, mais peut être utilisée directement pour des besoins spécifiques de rendu dynamique.

```angular2html
<div *luPortal="myContent; context:myContext" ></div>
```

Cette directive est null-safe.
