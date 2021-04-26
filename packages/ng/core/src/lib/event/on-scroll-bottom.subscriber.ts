export interface ILuOnScrollBottomSubscriber {
	onScrollBottom(): void;
}
export abstract class ALuOnScrollBottomSubscriber implements ILuOnScrollBottomSubscriber {
	abstract onScrollBottom(): void;
}
