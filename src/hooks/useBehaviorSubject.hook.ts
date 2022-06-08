import { useState, useEffect } from 'react';
import { type BehaviorSubject } from 'rxjs';

export const useBehaviorSubject = <T>(behaviorSubject: BehaviorSubject<T>): [T, (value: T) => void]=> {
  const [state, setState] = useState<T>(behaviorSubject.value);

  useEffect(() => {
    const sub = behaviorSubject.subscribe(setState);
    return () => sub.unsubscribe();
  }, [behaviorSubject]);

  const setBehaviorSubject = (value: T) => behaviorSubject.next(value);

  return [state, setBehaviorSubject];
};
