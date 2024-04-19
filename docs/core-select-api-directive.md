# CoreSelect API Directives

<details>

<summary>Appeler une API avec un format de retour V3 ou V4 sans customisation de l'affichage (l'entité doit avoir une propriété `name`)</summary>

Rien à faire en particulier, il suffit de donner l'API à appeler :

```html
<lu-simple-select apiV3="/api/v3/axisSections" />

<lu-simple-select apiV4="/api/legumes" />
```

</details>

<details>

<summary>Customisation de l'affichage de l'option et/ou de la valeur affichée</summary>

Il faut, dans ce cas, créer votre propre directive en s'aidant de `LuCoreSelectApiV4Directive` ou de `LuCoreSelectApiV3Directive`:

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

</details>

<details>

<summary>Appels d'API ne rentrant pas dans le moule habituel</summary>

Il faut, dans ce cas, créer votre propre directive en s'aidant de `ALuCoreSelectApiDirective` :

```typescript
import { Directive, input } from '@angular/core';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';

interface MyCustomEntity {
  code: number;
  name: string;
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

  protected optionComparer = (a: MyCustomEntity, b: MyCustomEntity) => a.code === b.code;

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

</details>
