import { useState, useEffect } from 'react';
import { type Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>, initialValue: T): T => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};
