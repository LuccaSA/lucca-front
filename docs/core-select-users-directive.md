# CoreSelectUsersDirective

## Mise en place

Il faut ajouter un _provider_ global dans votre `AppModule` ou dans votre fichier `app.config.ts` :

```typescript
{
  providers: [provideCoreSelectCurrentUserId(() => inject(PRINCIPAL).id)];
}
```

## Customisation

<details>

<summary>S'exclure de la sélection</summary>

Il est possible de s'exclure de la liste des utilisateurs sélectionnables grâce à `displayMeOption="false"`.

</details>

<details>

<summary>Modifier l'affichage d'une option (mais pas la source de données)</summary>

Il est possible de modifier l'affichage d'une option en fournissant un template pour les options. Pour cela, il faut ajouter un template avec la directive `luOptionTemplate` dans le composant parent.

```html
<lu-simple-select #usersRef="luUsers" placeholder="Placeholder..." users>
  <!-- Il est possible de modifier le rendu de l'utilisateur sélectionné avec *luDisplayer -->
  <ng-container *luDisplayer="let user; select: usersRef.select"> 👉👉👉 {{ user | luUserDisplay }} 👈👈👈 </ng-container>

  <!-- Il est possible de modifier le rendu de chaque option avec *luOption -->
  <ng-container *luOption="let user; select: usersRef.select">
    <div>🚀 {{ user | luUserDisplay }} 🚀</div>

    <!-- Ne pas oublier la gestion des homonymes en affichant `additionalInformation` -->
    <div *ngIf="user.additionalInformation">({{ user.additionalInformation }})</div>
  </ng-container>
</lu-simple-select>
```

</details>

<details>

<summary>Customiser la source de données (et éventuellement le rendu des options)</summary>

Il est possible de modifier la source de données utilisée par le composant. Pour cela, il faut créer une nouvelle directive qui étend `LuCoreSelectUsersDirective` et qui surcharge la méthode `getOptions`.

> ⚠️ Afin de déclencher le chargement au scroll, vous devez spécifier le paramètre `limit` dans les paramètres de votre requête.
> Vous pouvez utiliser `MAGIC_PAGE_SIZE`, qui correspond à une taille de page de **20** items, ou toute autre variable de votre choix.

```ts
import { Directive, forwardRef, inject } from '@angular/core';
import { LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select/user';
import { MAGIC_PAGE_SIZE } from '@lucca-front/ng/core-select/api';
import { Observable, map } from 'rxjs';

import { Person } from '../models';
import { PersonService } from '../services';


@Directive({
  selector: '[appPersons]',
  exportAs: 'appPersons',
  standalone: true,
  providers: [
    {
      provide: LuCoreSelectUsersDirective,
      useExisting: forwardRef(() => PersonsDirective),
    },
  ],
})
export class PersonsDirective extends LuCoreSelectUsersDirective<Person> {
  #personsService = inject(PersonService);

  protected override getOptions(params: Record<string, string | number | boolean>, page: number): Observable<Person[]> {
    return this.#personsService.getPersons({ page: page + 1, limit: MAGIC_PAGE_SIZE, ...params }).pipe(map((response) => response.items));
  }
}
```

```html
<lu-simple-select prPersons #selectRef />
```

Il est ensuite possible de modifier le rendu des options en utilisant des propriétés propres à votre modèle.

```html
<lu-simple-select #appPersonsRef="appPersons" appPersons>
  <ng-container *luDisplayer="let person; select: appPersonsRef.select">
    <div>{{ person.firstName }} {{ person.lastName }} {{ person.myCustomProperty }}</div>
  </ng-container>
  <ng-container *luOption="let person; select: appPersonsRef.select">
    <div>{{ person.firstName }} {{ person.lastName }}</div>
    <div>{{ person.myCustomProperty }}</div>
  </ng-container>
</lu-simple-select>

</details>
```
