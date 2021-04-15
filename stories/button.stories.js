export default {
  title: 'SCSS/Button',
  argTypes: {
    label: { control: 'text' },
    palette: { type: 'select', options: ['', 'palette-primary', 'palette-secondary', 'palette-success', , 'palette-warning', , 'palette-error'] },
    size: { type: 'select', options: ['', 'mod-smaller', 'mod-small', 'mod-standard', 'mod-big', 'mod-bigger'] },
    mod: { type: 'select', options: ['', 'mod-outline', 'mod-link']},
    state: { type: 'select', options: ['', 'is-loading', 'is-error', 'is-success']},
  },
};

const Template = ({ label, mod, palette, state, size, ...args }) => {
  return `
  <button type="button" class="button ${mod} ${palette} ${state} ${size}">${label}</button>
`;
};

export const Sandbox = Template.bind({});
Sandbox.args = {
  label: 'Button',
  palette: '',
  mod: '',
  state: '',
  size: '',
};

export const Basic = () => `
<button class="button">Basique</button>
<button class="button mod-outline">Blanc</button>
<button class="button mod-link">Lien</button>
`

export const Palettes = () => `
<div>
  <button class="button palette-primary">Primary</button>
  <button class="button palette-secondary">Secondary</button>
  <button class="button palette-success">Success</button>
  <button class="button palette-warning">Warning</button>
  <button class="button palette-error">Error</button>
</div>
<div>
  <button class="button mod-outline palette-primary">Primary</button>
  <button class="button mod-outline palette-secondary">Secondary</button>
  <button class="button mod-outline palette-success">Success</button>
  <button class="button mod-outline palette-warning">Warning</button>
  <button class="button mod-outline palette-error">Error</button>
</div>
`

export const Sizes = () => `
<button class="button mod-smaller">Smaller</button>
<button class="button mod-small">Small</button>
<button class="button">Standard</button>
`

export const States = () => `
<button class="button is-loading">Loading</button>
<button class="button is-success">Success</button>
<button class="button is-error">Success</button>
<button class="button is-disabled">Disabled</button>
<button class="button" disabled>Disabled</button>
`