export interface ILuOnOpenSubscriber {
	onOpen(): void;
}
export abstract class ALuOnOpenSubscriber implements ILuOnOpenSubscriber {
	abstract onOpen(): void;
}
