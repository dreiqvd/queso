import { debounce, MonoTypeOperatorFunction, of, timer } from 'rxjs';

export const inputDebounce: MonoTypeOperatorFunction<
  string | null | undefined
> = debounce((value) => (value ? timer(300) : of(0)));
