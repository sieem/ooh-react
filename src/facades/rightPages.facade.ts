import { switchMap, BehaviorSubject, Observable } from 'rxjs';
import { IPage } from '../interfaces/page.interface';

const rightPagesSubject$ = new BehaviorSubject({});

export const rightPages$: Observable<IPage[]> = rightPagesSubject$.pipe(
  switchMap(() => fetch('https://api.o-o-h.be/articles/r')),
  switchMap((res) => res.json()),
);
