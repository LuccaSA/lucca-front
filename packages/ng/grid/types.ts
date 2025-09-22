export type Property = 'row' | 'col' | 'rowspan' | 'colspan';
export type At = 'media' | 'container';
export type Breakpoint = 'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export type ResponsiveOptionKey = `${Property}At${Capitalize<At>}Min${Breakpoint}`;
export type ResponsiveConfig = Partial<Record<ResponsiveOptionKey, number>>;
