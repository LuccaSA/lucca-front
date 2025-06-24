### Appeler une API

Pour un format de retour V3 ou V4 sans customisation de l'affichage (l'entité doit avoir une propriété `name`), il suffit de donner l'API à appeler :

```html
<lu-simple-select apiV3="/api/v3/axisSections" />

<lu-simple-select apiV4="/api/legumes" />
```

### Personnaliser l'affichage

Dans le cas d'une personnalisation de l'option et/ou de la valeur affichée, il est nécessaire de créer votre propre directive en s'aidant de `LuCoreSelectApiV4Directive` ou de `LuCoreSelectApiV3Directive` :

```typescript
import { Directive } from '@angular/core';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';

export interface Legume {
  id: number;
  name: string;
  color: string;
}

@Directive({
  selector: '[luLegumes]',
  standalone: true,
  exportAs: 'luLegumes',
})
export class LuCoreSelectLegumesDirective extends LuCoreSelectApiV4Directive<Legume> {
  public constructor() {
    super();
    this.apiV4 = '/api/legumes';
  }
}
```

```html
<!-- Il faut récupérer la référence à la directive custom (ex #legumesRef) -->
<lu-simple-select luLegumes #legumesRef="luLegumes">
  <!-- On peut maintenant avoir le bon typage en passant le select exposé par la directive -->
  <ng-container *luDisplayer="let legume; select: legumesRef.select">
    <span [style.background-color]="legume.color">{{ legume.name }}</span>
  </ng-container>

  <ng-container *luOption="let legume; select: legumesRef.select">
    <!-- Il n'est pas obligatoire de fournir un luOption **et** un luDisplayer -->
    {{ legume.name }} ({{ legume.color }})
  </ng-container>
</lu-simple-select>
```

### API non conventionnelle (sans id)

Dans le cas d'un appel API ne rentrant pas dans le moule habituel, il est nécessaire de créer votre propre directive en s'aidant de `ALuCoreSelectApiDirective` :

```typescript
import { Directive, input } from '@angular/core';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';

interface MyCustomEntity {
  code: number;
  name: string;
  ownerId: number;
}

interface MyCustomApiQuery {
  exampleFilter?: string;
  clue?: string;
}

@Directive({
  selector: '[luMyCustomApi]',
  standalone: true,
  exportAs: 'luMyCustomApi',
})
export class LuCoreSelectMyCustomApiDirective extends ALuCoreSelectApiDirective<MyCustomEntity, MyCustomApiQuery> {
  #customApiService = inject(MyCustomApiService);

  exampleFilter = input<string>();

  protected params$ = combineLatest([
    toObservable(this.exampleFilter$),
    this.clue$, // ALuCoreSelectApiDirective is bound to the select's clue
  ]).pipe(map(([exampleFilter, clue]) => ({ exampleFilter, clue })));

  // Default value is option.id but here we want the code to be the key.
  // optionKey must return a unique value as it is used in track functions
  protected optionKey = (option: MyCustomEntity) => `${option.code}-${option.ownerId}`;

  protected getOptions(params: MyCustomApiQuery, page: number): Observable<MyCustomEntity[]> {
    return this.#customApiService.getAll(params, page);
  }
}
```

```html
<!-- Il faut récupérer la référence à la directive custom (ex #myCustomApiRef) -->
<lu-simple-select luMyCustomApi #myCustomApiRef="luMyCustomApi">
  <ng-container *luDisplayer="let entity; select: myCustomApiRef.select">
    <!-- On peut maintenant avoir le bon typage en passant le select exposé par la directive -->
    Sélectionnée : {{ entity.name }} ({{ entity.code }})
  </ng-container>

  <ng-container *luOption="let entity; select: myCustomApiRef.select">
    <!-- Il n'est pas obligatoire de fournir un luOption **et** un luDisplayer -->
    Option: {{ entity.name }} ({{ entity.code }})
  </ng-container>
</lu-simple-select>
```
