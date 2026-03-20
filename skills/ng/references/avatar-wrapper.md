# Avatar Wrapper

Wrapper layout for avatar usage (grouping and alignment).

**Storybook:** [Documentation/Users/Avatar/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Avatar Wrapper - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=21429-36994)  
**Node ID:** `21429-36994`

## Usage

```html
<div class="avatar-wrapper">
  <lu-user-picture [user]="user" size="S" />
  <div class="avatar-meta">
    <div class="name">{{ user.firstName }} {{ user.lastName }}</div>
    <div class="role">{{ user.jobTitle }}</div>
  </div>
</div>
```

> This wrapper is a layout pattern around `lu-user-picture`. Use spacing utilities or flexbox for alignment.

