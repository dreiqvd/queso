import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  debounce,
  fromEvent,
  MonoTypeOperatorFunction,
  Observable,
  of,
  timer,
} from 'rxjs';

export const inputDebounce: MonoTypeOperatorFunction<
  string | null | undefined
> = debounce((value) => (value ? timer(300) : of(0)));

export const onWindowResize = (
  destroyRef: DestroyRef,
  debounceTimer = 100
): Observable<Event> => {
  return fromEvent(window, 'resize').pipe(
    debounce(() => timer(debounceTimer)),
    takeUntilDestroyed(destroyRef)
  );
};
