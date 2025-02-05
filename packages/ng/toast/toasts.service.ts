import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultToastDuration, LuToast, LuToastInput } from './toasts.model';

@Injectable({ providedIn: 'root' })
export class LuToastsService {
	public toasts$ = new BehaviorSubject<LuToast[]>([]);

	public addToast(toastInput: LuToastInput): LuToast {
		const toast = this.getToast(toastInput);

		this.toasts$.next([...this.toasts$.value, toast]);

		return toast;
	}

	public removeToast(toast: LuToast): void {
		const updatedToasts = this.toasts$.value.filter(({ id }) => id !== toast.id);
		this.toasts$.next(updatedToasts);
	}

	public isOnlyDismissibleManually({ duration }: LuToastInput): boolean {
		return duration === null;
	}

	private getToast(toastInput: LuToastInput): LuToast {
		const id = this.generateId();
		const duration = this.isOnlyDismissibleManually(toastInput) ? toastInput.duration : (toastInput.duration ?? defaultToastDuration);

		return { ...toastInput, id, duration };
	}

	private generateId(): string {
		const randomString = Math.random().toString(36).substring(2, 9);
		return `_${randomString}`;
	}
}
