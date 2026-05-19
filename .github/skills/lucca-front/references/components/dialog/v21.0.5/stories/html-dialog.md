# dialog — Dialog _(HTML/CSS)_

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

#### Exemple:

#### Envoyer et reçevoir des données en Template-driven

Du fait que tout soit géré depuis le template, vous pouvez totalement ignorer la partie transmission de données car par définition,
la dialog box a accès à tout ce que le composant expose au template, fonctions et propriétés.

### Utilisation des formulaires

Dans le cas où vous souhaitez utiliser un formulaire au sein d’une [dialog box](https://prisme.lucca.io/94310e217/p/841b0b-dialogs), il vous suffit de placer la balise `form` avec une classe `dialog-inside-formOptional` autour du contenu de votre dialog, que celle-ci soit template-driven ou non :

```css
@forward '@lucca-front/scss/src/components/dialog';
import {DialogHeaderAction} from '@lucca-front/ng/dialog';
```

```html
<!-- config: ${…} -->

<button luButton [luDialogOpen]="dialogTpl" [luDialogConfig]="config">Open Template-driven Dialog</button>

<ng-template #dialogTpl>
	<lu-dialog #dialog>
		<lu-dialog-header>
			<h1>Template driven header</h1>
			You can also add more content in header
		</lu-dialog-header>

		<lu-dialog-content>Template-driven content</lu-dialog-content>

		<lu-dialog-footer>
			<div class="footer-content">Optional footer text</div>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

```html
<!-- config: ${…} -->

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
			<div class="footer-content">Optional footer text</div>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```

```html
<!-- config: ${…} -->

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
				<div class="footer-content">Optional footer text</div>
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
			<div class="footer-content">Optional footer text</div>
			<div class="footer-actions">
				<button type="button" luButton luDialogClose>Confirm</button>
				<button type="button" luButton="ghost" luDialogDismiss>Cancel</button>
			</div>
		</lu-dialog-footer>
	</lu-dialog>
</ng-template>
```
