// credits to https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
import { DependencyList, useCallback, useEffect } from "react";

export const useDebouncedEffect = (
  effect: (...args: unknown[]) => void,
  delay: number,
  deps: DependencyList
): void => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
