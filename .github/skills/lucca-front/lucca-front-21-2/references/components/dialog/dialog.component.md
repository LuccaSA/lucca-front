# dialog — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)

## Angular

Component selector : `lu-dialog`

### Basic

```html
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog">
	<div class="dialog-inside">
		<form class="dialog-inside-formOptional">
			<header class="dialog-inside-header">
				<button type="button" class="dialog-inside-header-button button">
					<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
					<span class="pr-u-mask">Fermer</span>
				</button>
				<div class="dialog-inside-header-container">
					<h1 class="dialog-inside-header-container-title" id="dialogInsideHeaderTitle1">Title</h1>
				</div>
			</header>
			<div class="dialog-inside-content">dialog</div>
			<footer class="dialog-inside-footer footer">
				<div class="footer-actions">
					<button type="submit" class="button">Action</button>
					<button type="button" class="button mod-ghost">Action</button>
				</div>
			</footer>
		</form>
	</div>
</div>
```

### Confirmation

```js
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-dialog #dialog>
	<lu-dialog-header>
		<h1>Confirmation</h1>
	</lu-dialog-header>
	<lu-dialog-content>Lorem ipsum dolor</lu-dialog-content>
	<lu-dialog-footer>
		<div class="footer-actions">
			<button type="button" luButton luDialogClose>Confirm</button>
			<button type="button" luButton="ghost">Cancel</button>
		</div>
	</lu-dialog-footer>
</lu-dialog>
```

### Multiple

```js
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
@let config = { mode: "drawer", autoFocus: ".open" };

<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl1" [luDialogConfig]="config">Open Dialog</button>

<ng-template #dialogTpl1>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 1</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl2" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl2>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 2</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl3" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl3>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 3</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl4" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl4>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 4</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined" [luDialogOpen]="dialogTpl5" [luDialogConfig]="config">
				Open Dialog
			</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>

<ng-template #dialogTpl5>
	<lu-dialog #dialog stacked>
		<lu-dialog-header>
			<h1>Dialog 5</h1>
		</lu-dialog-header>
		<lu-dialog-content>
			<button class="open" luButton="outlined">This is the end</button>
		</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

### Dialog

`LuDialogService` sert à ouvrir des dialog à travers vos applications, avec tous les attributs et la structure nécessaires à une bonne accessibilité.

Il peut être utilisé de deux manières principales: via le service ou via les directives (template-driven)

### Imports et providers

Afin de pouvoir utiliser `LuDialogService` , vous devez appeler la fonction `configureLuDialog` en tant qu’`EnvironmentProvider` , idéalement dans `bootstrapApplication`:

Puis dans le composant qui va ouvrir votre dialog box, appelez `provideLuDialog` dans les providers:

### Via le service

Pour ouvrir une dialog via le service, vous pouvez simplement appeler la méthode `LuDialogService.open(options: LuDialogConfig)`:

#### Envoyer des données à la dialog

Le système de dialog propose une approche qui se repose sur le composant qui contient le contenu du dialog, ce qui signifie que tout le typage se passe à un seul endroit: dans le composant.

La fonction `injectDialogData` sert à récupérer les données et sert au service à inférer le type de données attendues, la fonction `injectDialogRef`, quand à elle, permet de déclarer le type de données retournées pour un bon typage dans la `DialogRef`

Une fois le composant créé, la méthode `LuDialogService.open(options: LuDialogConfig)` vérifiera à la compilation que les options sont conformes:

#### Récupérer le résultat du dialog

`LuDialogRef` possède trois observables qui permettent de réagir aux résultats possibles de l'ouverture d'une dialog:

- `result$` permet d'observer le résultat renvoyé par un appel à la méthode `close`, si la dialog est fermé via la méthode `dismiss`, rien ne sera émis et l'observable complètera.
- `dismissed$` permet de savoir quand la dialog est fermé via un appel à la méthode `dismiss`, utilisée par défaut pour le click sur le backdrop, la croix de fermeture ou la touche Echap.
- `closed$` fusionne les deux observables ci-dessus et renvoie donc soit le résultat, soit `undefined`, en fonction de la façon donc la dialog a été fermé.

Gardons `MyDialogComponent` comme exemple:

### Via le template

Pour créer et ouvrir une dialog depuis le template, vous pouvez utiliser les directives et composants mises à disposition:

- `luDialogOpen` qui permet de déclencher une ouverture de dialog au click sur l'élément qui porte la directive.
- `lu-dialog` pour créer le template de la dialog à ouvrir.
- `luDialogClose` pour fermer la dialog via la méthode `close` lors du click sur son élément hôte.
- `luDialogDismiss` pour fermer la dialog via la méthode `dismiss` lors du click sur son élément hôte.

#### Envoyer et reçevoir des données en Template-driven

Du fait que tout soit géré depuis le template, vous pouvez totalement ignorer la partie transmission de données car par définition,
la dialog box a accès à tout ce que le composant expose au template, fonctions et propriétés.

### Utilisation des formulaires

Dans le cas où vous souhaitez utiliser un formulaire au sein d’une [dialog box](https://prisme.lucca.io/94310e217/p/841b0b-dialogs), il vous suffit de placer la balise `form` avec une classe `dialog-inside-formOptional` autour du contenu de votre dialog, que celle-ci soit template-driven ou non :

```js
import { configureLuDialog } from '@lucca-front/ng/dialog';
import { provideLuDialog } from '@lucca-front/ng/dialog';
import {DialogHeaderAction} from '@lucca-front/ng/dialog';
```

```ts
bootstrapApplication(App, {
  providers: [configureLuDialog()],
});
```

```ts
@Component({
  selector: 'my-component',
  ...
  providers: [provideLuDialog()]
})
```

```ts
// Tout d'abord, on récupère le service via injection
#dialog = inject(LuDialogService);

openDialog(): void {
    // On appele la méthode open en lui passant un Component en content, vous pouvez également passer un TemplateRef
    const dialogRef = this.#dialog.open({
        content: ExampleDialogComponent
    });
}
```

```ts
@Component({
  selector: 'my-dialog',
  template: `...`,
})
export class MyDialogComponent {
  /**
   *  Vous pouvez nommer le champ de données comme vous le souhaitez, celui-ci sera automatiquement retrouvé par le service.
   *
   *  Cependant, il doit obligatoirement être public.
   */
  myData = injectDialogData<{ name: string; height?: number }>();

  /**
   * Ici on récupère la référence au dialog ouvert et on en profite pour déclarer que ce dialog retourne un `boolean`
   *
   * Tout comme pour `injectDialogData`, le nom du champ importe peu, du moment qu'il est public.
   */
  ref = injectDialogRef<boolean>();

  close(): void {
    /**
     *  Le type de données passé à la méthode close doit correspondre au type passe à `injectDialogRef`
     *
     *  Ce type à une valeur par défaut à `void`, donc aucune donnée ne doit être passée si aucun type n'est passé à `injectDialogRef`
     */
    this.ref.close(true);
  }
}
```

```ts
this.#dialog.open({
  content: MyDialogComponent,
  data: { name: 'toto' }, // Fonctionne, seul name est required
});

this.#dialog.open({
  content: MyDialogComponent,
  // Erreur: aucun data fourni alors que le composant en a besoin
});

this.#dialog.open({
  content: MyDialogComponent,
  data: 25, // Erreur: data non conforme à l'interface demandée
});
```

```ts
const dialogRef = this.#dialog.open({
  content: MyDialogComponent,
  data: { name: 'toto' }, // On passe des data pour que ça fonctionne
});

// Cette logique ne sera pas déclenchée si l'utilisateur ferme la dialog via la touche Echap., la croix de fermeture ou un click sur le backdrop.
dialogRef.result$
  .pipe(
    switchMap((res: boolean) => {
      return this.serviceMetier.modifierTruc(res);
    }),
  )
  .subscribe(() => {
    this.notification.success('Opération réussie');
  });
```

```html
<!-- config: {"size":"M","alert":false,"mode":"default","panelClasses":[]} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Template driven header</h1>
			<p dialogHeaderSubtitle>Subtitle</p>
			<p dialogHeaderContent>You can also add more content in header</p>
		</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

```html
<!-- config: {"size":"S","alert":false,"mode":"default","autoFocus":"first-tabbable"} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>Template driven header</lu-dialog-header>

		<lu-dialog-content>
			<lu-form-field label="Example input">
				<lu-text-input [ngModel]="example" placeholder="This will be focused if autoFocus is set to first-input" />
			</lu-form-field>
		</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

```html
<!-- config: {"size":"S","alert":false,"mode":"default","autoFocus":"first-tabbable"} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">
	Open Template-driven Dialog with Form inside
</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<!--form = new FormGroup({
			example: new FormControl('', Validators.required)
		})-->
		<form [formGroup]="form" class="dialog-inside-formOptional">
			<lu-dialog-header>Template driven header with Form inside</lu-dialog-header>

			<lu-dialog-content>
				<lu-form-field label="Example input">
					<lu-text-input
						formControlName="example"
						placeholder="This will be focused if autoFocus is set to first-input"
					/>
				</lu-form-field>
			</lu-dialog-content>

			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="submit" luButton [disabled]="!form.valid" luDialogClose>Submit</button>
					<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
				</div>
			</lu-dialog-footer>
		</form>
	</lu-dialog>
</ng-template>
```

```html
<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog with action</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>
			Template driven header
			<ng-container dialogHeaderAction>
				<button luButton="ghost" size="S"><lu-icon icon="menuDots" alt="More options" /></button>
			</ng-container>
		</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

```html
<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="{ mode: 'fancy' }">
	Open Template-driven Fancy Dialog
</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog fancyIllustration="install">
		<lu-dialog-header>
			<h1>Félicitations, votre souscription est terminée</h1>
		</lu-dialog-header>
		<lu-dialog-content>Votre contrat signé vous a été envoyé par email.</lu-dialog-content>
		<lu-dialog-footer>
			<div class="footer-actions">
				<button type="button" luButton="outlined" luDialogClose>Fermer</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

## HTML/CSS

Classe CSS : `.dialog`

💡 L'ouverture d'une fenêtre de dialogue désactive le plan de document du reste de la page. Son titre doit donc être contenu dans une balise `<h1>` afin de rester valide.
