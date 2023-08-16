export interface ILuOnCloseSubscriber {
	onClose(): void;
}
export abstract class ALuOnCloseSubscriber implements ILuOnCloseSubscriber {
	abstract onClose(): void;
}
