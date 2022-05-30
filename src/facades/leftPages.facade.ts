import { switchMap, BehaviorSubject, Observable, map } from 'rxjs';
import { IPage } from '../interfaces/page.interface';
import { mapPageDtoToIPage } from './mapPages.utils';

const leftPagesSubject$ = new BehaviorSubject({});

export const leftPages$: Observable<IPage[]> = leftPagesSubject$.pipe(
  switchMap(() => fetch('https://api.o-o-h.be/articles/l')),
  switchMap((res) => res.json()),
  map((pages) => pages.map(mapPageDtoToIPage)),
);
