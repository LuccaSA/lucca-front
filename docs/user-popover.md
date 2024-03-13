# Documentation User Popover

La UserPopover est un composant qui apparaît au survol d'un élément et qui affiche différentes informations sur l'utilisateur.

## Setup

Afin de pouvoir installer la UserPopover, vous devez appeler la fonction `provideLuUserPopover` dans votre module racine.

```typescript
import { provideLuUserPopover } from '@lucca-front/ng/user-popover';

@NgModule({
  providers: [
		...
			provideLuUserPopover()
  ]
})
export class AppModule { }
```

## Utilisation

Pour utiliser la UserPopover, il vous suffit d'utiliser la directive `[luUserPopover]` et de lui fournir un LuUser

```html
<div [luUserPopover]="user"></div>
<div [luUserPopover]="{id: 1, firstName: 'Brian', lastName: 'Philibert'}"></div>
```

```typescript
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';

@Composant({
	...,
  imports: [
	...
		LuUserPopoverDirective,
	],
})
export class MyComponent { }
```

## Inputs

### luEmployeeCard

```html
<div [luUserPopover]="user"></div>
```

Permet de fournir un utilisateur à la UserPopover.


### luUserPopoverEnterDelay

```html
<div [luUserPopover]="user" [luUserPopoverEnterDelay]="200"></div>
```

Permet de définir le délai avant l'affichage du UserPopover en millisecondes. Par défaut 300

### luUserPopoverLeaveDelay

```html
<div [luUserPopover]="user" [luUserPopoverLeaveDelay]="200"></div>
```

Permet de définir le délai avant la disparition du UserPopover en millisecondes. Par défaut 100

### luUserPopoverDisabled

```html	
<div [luUserPopover]="user" [luUserPopoverDisabled]="true"></div>
```

Permet de désactiver le UserPopover

## Feature Flag
Au moment où sont écrites ces lignes, la UserPopover est branché sur un feature flag de la librairie `Lucca.Core.FeatureFlags`.
Il est donc nécessaire de l'activer dans votre application pour pouvoir l'utiliser.

Si vous souhaitez override ce feature flag, vous pouvez le faire écrasant vous-même l'InjectionToken `USER_POPOVER_IS_ACTIVATED`

```typescript
import { USER_POPOVER_IS_ACTIVATED } from '@lucca-front/ng/user-popover';

@NgModule({
  providers: [
		...
	{ provide: USER_POPOVER_IS_ACTIVATED, useValue: of(true) }
  ]
})
export class AppModule { }
```

Ce feature flag est temporaire et sera supprimé dans une prochaine version.

## Store et Services
Le User popover est fournit avec un service qui gère la récupération des données, mais aussi qui stocke les informations des utilisateurs déjà récupérés, y compris les images.
Ce service est un singleton et est donc partagé entre tous les UserPopover de l'application.

Il est possible de fournir un autre service qui implémente l'interface `ILuUserPopoverStore` pour gérer la récupération des données et le stockage des informations.

```typescript
// app.module.ts
import { ILuUserPopoverStore } from '@lucca-front/ng/user-popover';

@NgModule({
  providers: [
		...
	{ provide: LuUserPopoverStore, useClass: MyCustomEmployeeCardStore }
  ]
})
export class AppModule { }

// my-custom-employee-card-store.service.ts
import { ILuUserPopoverStore } from '@lucca-front/ng/user-popover';

@Injectable()
export class MyCustomEmployeeCardStore implements ILuUserPopoverStore {
	// ...
}
```






