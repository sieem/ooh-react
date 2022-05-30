import { switchMap, BehaviorSubject, Observable } from 'rxjs';
import { IPage } from '../interfaces/page.interface';

const leftPagesSubject$ = new BehaviorSubject({});

export const leftPages$: Observable<IPage[]> = leftPagesSubject$.pipe(
  switchMap(() => fetch('https://api.o-o-h.be/articles/l')),
  switchMap((res) => res.json()),
);
