import { CreateEffectOptions, effect, Signal, untracked } from '@angular/core';

type EffectWithDepsValues<T> = T extends readonly unknown[] ? TupleOfSignalValues<T> : [RecordOfSignalValues<T>];

type TupleOfSignalValues<T> = T extends readonly [Signal<infer U>, ...infer R] ? [U, ...TupleOfSignalValues<R>] : [];
type RecordOfSignalValues<T> = { [K in keyof T]: T[K] extends Signal<infer U> ? U : never };

type EffectWithDepsInput = ReadonlyArray<Signal<unknown>> | Record<string, Signal<unknown>>;

/**
 * Effect peut être dangereux car l'action accomplie peut elle-même déclencher des écritures dans des signaux.
 * C'est une mauvaise pratique, interdite par défaut par Angular.
 * La plupars du temps, seule la lecture des signaux est intéressante à tracker, pas les actions qui en découlent.
 */
export function ɵeffectWithDeps<const T extends EffectWithDepsInput>(dependencies: T, action: (...values: EffectWithDepsValues<T>) => unknown, options?: CreateEffectOptions): void {
	effect(() => {
		const deps = isReadonlyArray(dependencies) ? readTupleOfSignalValues(dependencies) : [readRecordOfSignalValues(dependencies)];

		untracked(() => action(...(deps as EffectWithDepsValues<T>)));
	}, options);
}

function readTupleOfSignalValues<T extends readonly Signal<unknown>[]>(signals: T): TupleOfSignalValues<T> {
	return signals.map((signal) => signal()) as TupleOfSignalValues<T>;
}

function readRecordOfSignalValues<T extends Record<string, Signal<unknown>>>(signals: T): RecordOfSignalValues<T> {
	return Object.fromEntries(Object.entries(signals).map(([key, signal]) => [key, signal()])) as RecordOfSignalValues<T>;
}

function isReadonlyArray(input: EffectWithDepsInput): input is ReadonlyArray<Signal<unknown>> {
	return Array.isArray(input);
}
