import { switchMap, BehaviorSubject, Observable, map } from 'rxjs';
import { IPage } from '../interfaces/page.interface';
import { mapPageDtoToIPage } from './mapPages.utils';

const rightPagesSubject$ = new BehaviorSubject({});

export const rightPages$: Observable<IPage[]> = rightPagesSubject$.pipe(
  switchMap(() => fetch('https://api.o-o-h.be/articles/r')),
  switchMap((res) => res.json()),
  map((pages) => pages.map(mapPageDtoToIPage)),
  map((pages) => pages.reverse()),
);
