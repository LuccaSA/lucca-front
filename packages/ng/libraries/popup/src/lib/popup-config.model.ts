export interface ILuPopupConfig {
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	noBackdrop?: boolean;
	/** popup dismisses if `esc` is pressed or backdrop is clicked */
	undismissable?: boolean;
	backdropClass?: string | string[];
	panelClass?: string | string[];
	size?: string;
}
