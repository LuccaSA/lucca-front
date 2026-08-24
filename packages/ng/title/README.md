# LuTitleStrategy

## Usage

Add `title` properties in your routes config:

```typescript
const routes: Routes = [
  {
    path: '',
    title: 'Parent title',
    children: [
      {
        path: ':requestId',
        title: 'Sub route title',
      },
    ],
  },
];
```

The service should now be able to collect all `title` properties defined for the current url. Each time a new `title` is found for a child, it will be translated and prepended, ending with `– Lucca YourAppName`.

ex: `Sub route title – Parent title – Lucca YourAppName`

### Dynamic titles

A `title` can also be a function, which is how Lucca apps declare their titles:

```typescript
const routes: Routes = [
  {
    path: 'requests',
    title: () => translate('Requests_Title'),
  },
  {
    path: 'requests/:requestId',
    title: (route) => translate('Request_Title', { id: route.paramMap.get('requestId') }),
  },
];
```

Each resolved title is then handed to your `translateService` as a translation key, along with the route params and the route data (including resolved data) as interpolation arguments. So a static `title: 'Request {{requestId}}'` works too, as long as your translation library interpolates. Params and resolved data of the parent routes are available as well, as long as the router keeps its default `paramsInheritanceStrategy: 'always'`.

When the title is only known from inside a component, the `prependTitle` method from `LuTitleStrategy` enables you to add a custom title.
In a component, you could do the following:

```typescript
const userName: string = this.userService.getCurrentUser();
this.luTitleStrategy.prependTitle(userName);
```

You can also replace the first fragment using:

```typescript
const userName: string = this.userService.getOtherUser();
this.luTitleStrategy.overrideFirstTitlePart(userName);
```

Both `prependTitle` and `overrideFirstTitlePart` can also be called using `Observable<string>` :

```typescript
const selectedUser$ = this.userStore.selected$;
this.luTitleStrategy.prependTitle(selectedUser$);
```

## Quickstart

You will need to:

- Install `@lucca-front/ng`
- Create a service (`YourAppNameTranslateService`) that implements the `ILuTitleTranslateService`
- Call `provideLuTitleStrategy` in your `app.module.ts` / `app.config.ts`

```ts
provideLuTitleStrategy({
  appName: () => 'YourAppName',
  translateService: () => inject(YourAppNameTranslateService), // optional
}),
```

### Naming Strategy

Two naming strategies are available:

- The app is a product (default: `'product'`), the title must end with `– Lucca YourAppName`
- The app is something else (`'other'`), the title must end with `– YourAppName – Lucca`

In this case, you must provide the optional parameter `namingStrategy: 'other'` like so:

```ts
provideLuTitleStrategy({
  appName: () => 'YourAppName',
  translateService: () => inject(YourAppNameTranslateService), // optional
  namingStrategy: 'other',
}),
```

### Handling translations

`YourAppNameTranslateService` be used in combination with the token `LU_TITLE_TRANSLATE_SERVICE`.

This service should implement the `ILuTitleTranslateService` interface. It allows you to use any translation service (`ngx-translate`, `transloco`, ...etc).

You should end up with the following if you are using `ngx-translate`:

```typescript
@Injectable({ providedIn: 'root' })
export class CoreHRTranslateService implements ILuTitleTranslateService {
  constructor(private translateService: TranslateService) {}
  translate(key: string, args: unknown): string {
    return this.translateService.instant(key, args);
  }
}
```

or if you are using `transloco`:

```typescript
@Injectable({ providedIn: 'root' })
export class CoreHRTranslateService implements ILuTitleTranslateService {
  constructor(private translateService: TranslocoService) {}
  translate(key: string, args: HashMap): string {
    return this.translateService.translate(key, args);
  }
}
```

### Adapt `app.module.ts` config

In the `app.module.ts`, you need to call `provideLuTitleStrategy` in the `providers` array:

```typescript
@NgModule({
  providers: [provideLuTitleStrategy({ translateService: () => inject(YourAppNameTranslateService) })],
})
export class AppModule {}
```

### Example with lucca-cdk

lucca-cdk provides a `getStoreModuleName(moduleId)` function that will fetch the name of your module from the Lucca Store API.

Use it like this in your `app.config.ts` / `main.ts` file:

```ts
import { provideLuTitleStrategy } from '@lucca-front/ng/title';
import { getStoreModuleName } from '@lucca/cdk/remote-entity';

provideLuTitleStrategy({
  appTitle: () => getStoreModuleName('my-module-id'),
}),
```
