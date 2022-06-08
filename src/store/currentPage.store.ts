import { BehaviorSubject, map, combineLatest } from 'rxjs';
import { leftPages$, rightPages$ } from '../facades/pages.facade';

export const currentPageId$ = new BehaviorSubject<number>(0);

export const currentLeftPage$ = combineLatest([leftPages$, currentPageId$]).pipe(
  map(([leftPages, currentPageId]) => leftPages[currentPageId])
);

export const currentRightPage$ = combineLatest([rightPages$, currentPageId$]).pipe(
  map(([rightPages, currentPageId]) => rightPages[rightPages.length - currentPageId -1])
);
