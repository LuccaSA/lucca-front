# userpopover — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-users-display-userpopover--docs)


## HTML/CSS

### Popover

```css
@forward '@lucca-front/scss/src/components/user-popover';
```

```html
<button type="button" class="userPopover_trigger" [luUserPopover]="finn" translate="no">
	{{ finn | luUserDisplay : 'lf' }}
</button>
```
