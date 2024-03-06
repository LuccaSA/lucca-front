# Documentation User Popover

La UserPopover est un composant qui apparaît au survol d'un élément et qui affiche différentes informations sur l'utilisateur.

## Setup

Afin de pouvoir installer la UserPopover, vous devez appeler la fonction 'provideUserPopover' dans votre module racine.

```typescript
import { provideUserPopover } from '@lucca-front/ng/user-popover';

@NgModule({
  providers: [
		...
	provideUserPopover()
  ]
})
export class AppModule { }
```

## Utilisation

Pour utiliser la UserPopover, il vous suffit d'utiliser la directive '[luEmployeeCard]' et de lui fournir un LuUser

```html
<div [luEmployeeCard]="user"></div>
<div [luEmployeeCard]="{id: 1, firstName: 'Brian', lastName: 'Philibert'}"></div>
```

## Inputs

### luEmployeeCard

```html
<div [luEmployeeCard]="user"></div>
```

Permet de fournir un utilisateur à la UserPopover.


### luEmployeeCardEnterDelay

```html
<div [luEmployeeCard]="user" [luEmployeeCardEnterDelay]="200"></div>
```

Permet de définir le délai avant l'affichage du UserPopover en millisecondes. Par défaut 300

### luEmployeeCardLeaveDelay

```html
<div [luEmployeeCard]="user" [luEmployeeCardLeaveDelay]="200"></div>
```

Permet de définir le délai avant la disparition du UserPopover en millisecondes. Par défaut 100

### luEmployeeCardDisabled

```html	
<div [luEmployeeCard]="user" [luEmployeeCardDisabled]="true"></div>
```

Permet de désactiver le UserPopover

## Feature Flag
Au moment où sont écrites ces lignes, la UserPopover est branché sur un feature flag de la librairie Lucca.Core.FeatureFlags.
Il est donc nécessaire de l'activer dans votre application pour pouvoir l'utiliser.

Si vous souhaitez override ce feature flag, vous pouvez le faire écrasant vous-même l'InjectionToken USER_POPOVER_IS_ACTIVATED

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

Il est possible de fournir un autre service qui implémente l'interface ILuEmployeeCardStore pour gérer la récupération des données et le stockage des informations.

```typescript
// app.module.ts
import { ILuEmployeeCardStore } from '@lucca-front/ng/user-popover';

@NgModule({
  providers: [
		...
	{ provide: LuEmployeeCardStore, useClass: MyCustomEmployeeCardStore }
  ]
})
export class AppModule { }

// my-custom-employee-card-store.service.ts
import { ILuEmployeeCardStore } from '@lucca-front/ng/user-popover';

@Injectable()
export class MyCustomEmployeeCardStore implements ILuEmployeeCardStore {
	// ...
}
```






