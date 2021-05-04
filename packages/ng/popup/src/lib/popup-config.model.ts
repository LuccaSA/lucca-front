export interface ILuPopupConfig {
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	noBackdrop?: boolean;
	/** popup dismisses if `esc` is pressed or backdrop is clicked, set it to true if you want to prevent it but be aware that your popup might become unclosable */
	undismissable?: boolean;
	backdropClass?: string | string[];
	panelClass?: string | string[];
	size?: string;
}
