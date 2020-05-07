export interface ILuPopupConfig {
	position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
	noBackdrop?: boolean;
	disableClose?: boolean;
	backdropClass?: string | string[];
	panelClass?: string | string[];
	size?: string;
}
