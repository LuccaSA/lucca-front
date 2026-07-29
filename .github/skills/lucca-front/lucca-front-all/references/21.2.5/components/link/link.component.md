# link — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Angular

Component selector : `luLink`

### Navigation interne et externe 

On privilégiera l'utilisation du routing Angular pour la navigation **interne** à l'application. Dans ce cas, la route est à passer directement via `luLink`.

Dans le cas d'une navigation **externe** à l'application, l'URL est à renseigner via la propriété `href`.

Dans les deux cas, l'ouverture du lien peut se faire dans la même page ou dans une nouvelle page. Dans le second cas, on utilisera la propriété `external`.

## HTML/CSS

Classe CSS : `.link`

### Sécurité

Pour des raisons de sécurité il convient de rajouter à nos liens externes, les attributs `rel="noopener noreferrer"`. Ceci évite au navigateur d'ouvrir la ressource cible en donnant au nouveau contexte de navigation l'accès au document précédent. Pour plus de précisions : [https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener](https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener)

| Example | File |
|---------|------|
| Testing | [html-testing.md](./stories/html-testing.md) |
| Angular | [html-angular.md](./stories/html-angular.md) |
| Basic | [html-basic.md](./stories/html-basic.md) |
