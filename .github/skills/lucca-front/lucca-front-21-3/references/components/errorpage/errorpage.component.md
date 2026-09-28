# errorpage — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-feedback-errorpage-angular-basic--docs)

## Angular

Mots-clés : page d'erreur, 404, 500

Component selector : `lu-error-page`

### Page basic

```js
import { provideRouter } from '@angular/router';
import { ERROR_PAGE_ILLUSTRATION, ErrorPageComponent } from '@lucca-front/ng/error-page';
```

```html
<lu-error-page heading="Erreur 404" illustration="404">
	<p>La page que vous cherchez n’existe pas.</p>
	<p><a href="#">Revenir à la page précédente</a></p>
</lu-error-page>
```

## HTML/CSS

🔗 [Spécifique Lucca — Liste des illustrations d'erreur](https://www.notion.so/Error-page-c7a6edc9b2364d479b079359d9b7b838)

Classe CSS : `.errorPage`

### Page basic

```css
@forward '@lucca-front/scss/src/components/error-page';
@forward '@lucca-front/scss/src/components/textFlow';
```

```html
<div class="errorPage">
	<section class="errorPage-section">
		<div class="errorPage-section-info">
			<h1 class="errorPage-section-info-title">Erreur 403</h1>
			<div class="textFlow">
				<p>Vous n’êtes pas autorisé à consulter cette page ou cette ressource.</p>
				<p><a href="#">Revenir à la page précédente</a></p>
			</div>
		</div>
		<img
			src="https://cdn.lucca.fr/errors/svg/403-lucca.svg"
			width="600"
			height="400"
			alt=""
			class="errorPage-section-image"
		/>
	</section>
</div>
```
