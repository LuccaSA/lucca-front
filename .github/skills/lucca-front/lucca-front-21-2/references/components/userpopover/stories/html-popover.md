# userpopover — Popover _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/user-popover';
```

```html
<button type="button" class="userPopover_trigger" [luUserPopover]="finn" translate="no">
	{{ finn | luUserDisplay : 'lf' }}
</button>
```
