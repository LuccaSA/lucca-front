# modal — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-overlays-modal--docs)

## Angular

🚧 Modal utilise aujourd'hui le nouveau service Dialog par défaut. Il est prévu de la conserver en tant qu'outil permettant de créer rapidement une fenêtre de dialogue et sera ainsi renommée dans le futur.

## Modal Angular

## HTML/CSS

### Modal

```css
@forward '@lucca-front/scss/src/components/modal';
```

```html
<lu-toasts [sources]="[]" />
<button type="button" luButton (click)="openModal()">Open</button>
```
