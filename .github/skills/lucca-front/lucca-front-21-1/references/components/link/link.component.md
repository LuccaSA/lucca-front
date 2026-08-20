# link — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Angular

Component selector : `luLink`

### Navigation interne et externe 

On privilégiera l'utilisation du routing Angular pour la navigation **interne** à l'application. Dans ce cas, la route est à passer directement via `luLink`.

Dans le cas d'une navigation **externe** à l'application, l'URL est à renseigner via la propriété `href`.

Dans les deux cas, l'ouverture du lien peut se faire dans la même page ou dans une nouvelle page. Dans le second cas, on utilisera la propriété `external`.

## HTML/CSS

### Sécurité

Pour des raisons de sécurité il convient de rajouter à nos liens externes, les attributs `rel="noopener noreferrer"`. Ceci évite au navigateur d'ouvrir la ressource cible en donnant au nouveau contexte de navigation l'accès au document précédent. Pour plus de précisions : [https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener](https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener)

### Testing

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<div>
	<a luLink="/first">Go to /first</a>
	<br />
	<a luLink="/second">Go to /second</a>
	<br />
	<a luLink [href]="url" target="_blank" external>Go to https://example.org</a>
</div>
<router-outlet />
```

### Angular

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
Routing application :
<a luLink="./#example">Text link</a>
<br />
Routing application (nouvelle fenêtre) :
<a luLink="./#example" external>Text link</a>
<br />
Lien hors application :
<a href="https://www.example.org" luLink>Text link</a>
<br />
Lien hors application (nouvelle fenêtre) :
<a href="https://www.example.org" luLink external>Text link</a>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<a href="#" class="link">Text link</a>
<br />
<br />
<a class="link mod-icon" href="#" target="_blank">
	Text link
	<!-- no text node here -->
	<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
	<span class="pr-u-mask">Open in a new window</span>
</a>
```
