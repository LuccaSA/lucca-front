# Identification des pages

# Règles d'usage

### **En bref**

* Un favicon reprenant le logo Lucca et la couleur du produit.
* Toujours nommer une page en partant du plus précis : “**Page - Produit**”.

## Favicon

Le favicon doit contenir le logo Lucca en blanc sur fond coloré. Le fond doit être de la couleur de la gamme (Temps et activités, Talent, Dépenses professionnelles, Rémunérations et avantages, Gestion administrative & Lucca), correspondant à la nuance Product 700.

L’utilisateur peut alors identifier rapidement les onglets et la marque Lucca parmi d’autres, tout en rattachant ces onglets à un produit à l’aide de la couleur.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148576">

**Favicon**

**Favicon**

</design>

## Titres & URL

Pour chaque URL unique, un titre de page unique doit exister. Deux pages différentes ne peuvent  pas partager le même titre. L’unicité des titres doit être préservée afin de pouvoir identifier précisément le contexte d’affichage de chaque page.

Pour les utilisateurs qui se servent de technologies d’assistances (comme par exemple un lecteur d’écran), c’est aussi un point important qui leur permettra d’identifier les changements de contextes.

Grâce à ces titres de pages uniques, les utilisateurs retrouvent facilement les pages qu’ils ont mises en favoris. Ils se repèrent mieux parmi les fenêtres et les onglets qu’ils ont ouverts.

### Relation avec le titre de l’interface

Un titre de page ne reproduit donc surtout pas à l’identique le titre de niveau 1 déjà présent dans la page.

### Hiérarchiser les titres

#### Format

Les titres sont séparés en plusieurs composants, qui permettent d’identifier la ressource **du plus précis au plus général**. Les onglets pouvant être réduits quand ils sont nombreux ou affichés dans une vue mobile, c’est un point important qui assure une différenciation entre ceux-ci dès les premiers caractères. Les utilisateurs peuvent alors lire l’information principale des titres, même avec une vue partielle de leurs onglets ou favoris.

Les composants de titres sont séparés par des tirets demi-cadratins entourés d’espaces « – ». Ce signe a l’avantage d’être typographiquement correct (contrairement à un trait d’union), d’être correctement restitué par les technologies d’assistance, et d’être internationalement compris comme un séparateur.

**Le nom “Lucca” faisant partie intégrante du nom des applications, nous ne le répétons pas en fin de chaîne. En revanche, pour les autres pages, nous ajoutons le terme "Lucca".**

Exemples :

* Planning – Lucca Absences
* Factures – Achat n° 3489 – Mes achats – Lucca Factures
* Rôles – Organisation – Administration – Lucca
* Croissance – Tableaux de bord – Lucca

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148628">

**Format**

**Format**

</design>

#### Regroupement de modules

Le regroupement de plusieurs modules ont un impact sur le sitemap et donc sur le titre de la page. Même s’il n’existe pas d’interface à proprement parler pour les regroupements, il est nécessaire de les faire figurer dans le titre.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148687">

**Sidenav - Poplee**

**Sidenav - Poplee**

</design>

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148718">

**Sidenav - Timmi**

**Sidenav - Timmi**

</design>

#### Navigation dans un module

Le composant Horizontal navigation utilise un pattern de navigation : l’URL et le titre de la page s’en trouvent donc impactés.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148812">

**Tabs - Cleemy**

**Tabs - Cleemy**

</design>

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148749">

**Tabs - Poplee**

**Tabs - Poplee**

</design>

#### Dialogs

Les Dialogs ne doivent pas être considérés comme des pages à part entière et doivent être implémentés en fonction. L’affichage de ces fenêtre modales n’impacte donc pas le titre, ni l’URL de la page.

#### Cas particuliers

Dans certains cas, l’information permettant de différencier plusieurs onglets n’est pas l’objet le plus précis. Il est alors possible d’intervertir des données dans le titre pour identifier plus rapidement le bon onglet. C’est notamment le cas sur le Dossier RH où le nom du collaborateur reste le meilleur moyen d’identifier une page.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148875">

**Dossier RH**

**Dossier RH**

</design>

### Chargement et internationalisation

Au chargement d’une application, la localisation et donc la langue ne sont pas connues. Il faut donc afficher un titre par défaut “Lucca” car cela permet de ne pas faire le choix d’une langue par défaut.

Une fois l’application chargée, le titre de la page s’adapte en fonction de la localisation.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3784:148920">

**Loading**

**Loading**

</design>

# Angular

La stratégie Angular pour la gestion des titres de pages sera mise à jour en version 19.3.3 afin de correspondre aux nouvelles guidelines.

# LuTitleStrategy

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

The service should now be able to collect all `title` properties defined for the current url. Each time a new `title` is found for a child, it will be translated and prepended, ending with `– Lucca YourAppName`.

ex: `Sub route title – Parent title – Lucca YourAppName`

For dynamic titles, the `prependTitle` method from `LuTitleStrategy` enables you to add a custom title.
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
