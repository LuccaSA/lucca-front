# Documentation Dialog

`LuDialogService` sert à ouvrir des dialog à travers vos applications, avec tous les attributs et la structure nécessaires à une bonne accessibilité.

Il peut être utilisé de deux manières principales: via le service ou via les directives (template-driven)

## Imports et providers

Afin de pouvoir utiliser `LuDialogService` , vous devez appeler la fonction `configureLuDialog`  en tant qu’`EnvironmentProvider` , idéalement dans `bootstrapApplication`:

```tsx
import { configureLuDialog } from '@lucca-front/ng/dialog';

bootstrapApplication(App, {
  providers: [configureLuDialog()],
})
```

Puis dans le composant qui va ouvrir votre dialog box, appelez `provideLuDialog` dans les providers:

```tsx
import { provideLuDialog } from '@lucca-front/ng/dialog';

@Component({
  selector: 'my-component',
  standalone: true,
  ...
  providers: [provideLuDialog()]
})
```

## Via le service

Pour ouvrir une dialog via le service, vous pouvez simplement appeler la méthode `LuDialogService.open(options: LuDialogConfig)`:

```tsx
// Tout d'abord, on récupère le service via injection
#dialog = inject(LuDialogService);

openDialog(): void {
    // On appele la méthode open en lui passant un Component en content, vous pouvez également passer un TemplateRef
    const dialogRef = this.#dialog.open({
        content: ExampleDialogComponent
    });
}

```

### Envoyer des données à la dialog

Le système de dialog propose une approche qui se repose sur le composant qui contient le contenu du dialog, ce qui signifie que tout le typage se passe à un seul endroit: dans le composant.

La fonction `injectDialogData` sert à récupérer les données et sert au service à inférer le type de données attendues, la fonction `injectDialogRef`, quand à elle, permet de déclarer le type de données retournées pour un bon typage dans la `DialogRef`

```tsx
@Component({
  selector: 'my-dialog',
  template: `...`
})
export class MyDialogComponent {
  /**
   *  Vous pouvez nommer le champ de données comme vous le souhaitez, celui-ci sera automatiquement retrouvé par le service.
   *
   *  Cependant, il doit obligatoirement être public.
   */
  myData = injectDialogData<{ name: string, height?: number }>();

  /**
   * Ici on récupère la référence au dialog ouvert et on en profite pour déclarer que ce dialog retourne un `boolean`
   *
   * Tout comme pour `injectDialogData`, le nom du champ importe peu, du moment qu'il est public.
   */
  ref = injectDialogRef<boolean>()

  close():void{
    /**
     *  Le type de données passé à la méthode close doit correspondre au type passe à `injectDialogRef`
     *
     *  Ce type à une valeur par défaut à `void`, donc aucune donnée ne doit être passée si aucun type n'est passé à `injectDialogRef`
     */
    this.ref.close(true);
  }
}

```

Une fois le composant créé, la méthode `LuDialogService.open(options: LuDialogConfig)` vérifiera à la compilation que les options sont conformes:

```tsx
this.#dialog.open({
  content: MyDialogComponent,
  data: { name: 'toto' } // Fonctionne, seul name est required
});

this.#dialog.open({
    content: MyDialogComponent,
    // Erreur: aucun data fourni alors que le composant en a besoin
});

this.#dialog.open({
  content: MyDialogComponent,
  data: 25 // Erreur: data non conforme à l'interface demandée
});

```

### Récupérer le résultat du dialog

`LuDialogRef` possède trois observables qui permettent de réagir aux résultats possibles de l'ouverture d'une dialog:

- `result$` permet d'observer le résultat renvoyé par un appel à la méthode `close`, si la dialog est fermé via la méthode `dismiss`, rien ne sera émis et l'observable complètera.
- `dismissed$` permet de savoir quand la dialog est fermé via un appel à la méthode `dismiss`, utilisée par défaut pour le click sur le backdrop, la croix de fermeture ou la touche Echap.
- `closed$` fusionne les deux observables ci-dessus et renvoie donc soit le résultat, soit `undefined`, en fonction de la façon donc la dialog a été fermé.

Gardons `MyDialogComponent` comme exemple:

```tsx
const dialogRef = this.#dialog.open({
  content: MyDialogComponent,
  data: { name: 'toto' } // On passe des data pour que ça fonctionne
});

// Cette logique ne sera pas déclenchée si l'utilisateur ferme la dialog via la touche Echap., la croix de fermeture ou un click sur le backdrop.
dialogRef.result$.pipe(
  switchMap((res: boolean) => {
    return this.serviceMetier.modifierTruc(res);
  })
).subscribe(() => {
  this.notification.success("Opération réussie");
});

```

## Via le template

Pour créer et ouvrir une dialog depuis le template, vous pouvez utiliser les directives et composants mises à disposition:

- `luDialogOpen` qui permet de déclencher une ouverture de dialog au click sur l'élément qui porte la directive.
- `lu-dialog` pour créer le template de la dialog à ouvrir.
- `luDialogClose` pour fermer la dialog via la méthode `close` lors du click sur son élément hôte.
- `luDialogDismiss` pour fermer la dialog via la méthode `dismiss` lors du click sur son élément hôte.

### Exemple:

```html
<!-- luDialogOpen va ouvrir la dialog déclaré dans #dialogTpl au click sur le bouton. Il est possible de passer une config via l'input luDialogConfig -->
<button luButton [luDialogOpen]="dialogTpl">Open Dialog</button>
<!-- On utilise ng-template pour des raisons de lazy loading et de référence plus simple -->
<ng-template #dialogTpl>
  <lu-dialog #dialog>
    <!--Tout comme pour les dialog component-based, vous avez les composants de structure à disposition-->
    <lu-dialog-header>Informations à propos de ...</lu-dialog-header>

    <lu-dialog-content>
      Contenu de la dialog
    </lu-dialog-content>

    <lu-dialog-footer>
      <div class="footer-actions">
        <!-- Cliquer ici va fermer la dialog avec la méthode close -->
        <button type="button" luButton luDialogClose>Close</button>
        <!-- Cliquer ici va déclencher une méthode avec comme paramètre la référence de la dialog, de type LuDialogRef -->
        <button type="button" luButton (click)="doSomethingWithRef(dialog.dialogRef)">Do something with ref</button>
        <!-- Cliquer ici va fermer la dialog avec la méthode dismiss -->
        <button type="button" luButton="text" luDialogDismiss>Dismiss</button>
      </div>
    </lu-dialog-footer>
  </lu-dialog>
</ng-template>

```

### Envoyer et reçevoir des données en Template-driven

Du fait que tout soit géré depuis le template, vous pouvez totalement ignorer la partie transmission de données car par définition,
la dialog box a accès à tout ce que le composant expose au template, fonctions et propriétés.

## Utilisation des formulaires

Dans le cas où vous souhaitez utiliser un formulaire au sein d’une dialog box, il vous suffit de placer la balise `form` avec une classe `dialog-form` autour du contenu de votre dialog, que celle-ci soit template-driven ou non:

```html
<lu-dialog>
		<!--form = new FormGroup({
			example: new FormControl('', Validators.required)
		})-->
		<form [formControl]="form" class="dialog-form">
			<lu-dialog-header>Header with Form inside</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Example input">
					<lu-text-input formControlName="example" placeholder="This will be focused if autoFocus is set to first-input"></lu-text-input>
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-content">Optional footer text</div>
				<div class="footer-actions">
					<button type="submit" luButton [disabled]="!form.valid" luDialogClose>Submit</button>
					<button type="button" luButton="text" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</form>
	</lu-dialog>
```