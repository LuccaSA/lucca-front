export type At = 'media' | 'container';
export type Breakpoint = 'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export type ResponsiveConfig<T extends string, V> = Partial<Record<ResponsiveProperty<T>, V>>;
export type ResponsiveProperty<T extends string> = `${T}At${Capitalize<At>}Min${Breakpoint}`;
