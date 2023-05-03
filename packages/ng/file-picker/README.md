# Page titles

## Usage

Add `title` properties in your routes config:

```typescript
const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Parent title',
		},
		children: [
			{
				path: ':requestId',
				data: {
					title: 'Sub route title',
				},
			},
		],
	},
];
```

The service should now be able to collect all `title` properties defined for the current url. Each time a new `title` is found for a child, it will be translated and prepended, ending with `YourAppName - Lucca`.

ex: `Sub route title - Parent title - YourAppName - Lucca`

For dynamic titles, the `prependTitle` method from `LuTitleService` enables you to add a custom title.
In a component, you could do the following:

```typescript
const userName: string = this.userService.getCurrentUser();
this.luTitleService.prependTitle(userName);
```

You can also replace the first fragment using:

```typescript
const userName: string = this.userService.getOtherUser();
this.luTitleService.overrideFirstTitlePart(userName);
```

Both `prependTitle` and `overrideFirstTitlePart` can also be called using `Observable<string>` :

```typescript
const selectedUser$ = this.userStore.selected$;
this.luTitleService.prependTitle(selectedUser$);
```

## Quickstart

You will need to:

- Install `@lucca-front/ng`
- Create a service (`YourAppNameTranslateService`) that implements the `ILuTitleTranslateService`
- Provide this service in the `app.module.ts` and import `LuTitleModule`
- Init the `LuTitleService` in your `app.component.ts`

### Let's start by creating the service

`YourAppNameTranslateService` be used in combination with the token `LU_TITLE_TRANSLATE_SERVICE`.

This service should implement the `ILuTitleTranslateService` interface. It allows you to use any translation service (`ngx-translate`, `transloco`, ...etc).

You should end up with the following if you are using `ngx-translate`:

```typescript
@Injectable({ providedIn: 'root' })
export class CoreRhTranslateService implements ILuTitleTranslateService {
	constructor(private translateService: TranslateService) {}
	translate(key: string, args: unknown): string {
		return this.translateService.instant(key, args);
	}
}
```

or if you are using `transloco`:

```typescript
@Injectable({ providedIn: 'root' })
export class CoreRhTranslateService implements ILuTitleTranslateService {
	constructor(private translateService: TranslocoService) {}
	translate(key: string, args: HashMap): string {
		return this.translateService.translate(key, args);
	}
}
```

### Adapt `app.module.ts` config

Import the `LuTitleModule` and provide the service you just created to the token `LU_TITLE_TRANSLATE_SERVICE` in the `app.module.ts` :

```typescript
@NgModule({
 imports: [
  LuTitleModule
 ],
 provide: [
  {
   provide: LU_TITLE_TRANSLATE_SERVICE,
   useExisting: YourAppNameTranslateService
  }
 ]
```

### Init the `LuTitleService`

In the the `app.component.ts`, init the LuTitleService by passing the name of you app:

```typescript
this.luTitleService.init('**YourAppName**');
```
