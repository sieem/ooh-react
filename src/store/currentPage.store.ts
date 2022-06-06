import { BehaviorSubject, map, combineLatest } from 'rxjs';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';

const currentPageSubjectId = new BehaviorSubject<number>(0);

export const setCurrentPageId = (page: number | string | undefined) => {
  currentPageSubjectId.next(+(page ?? 0));
};

export const currentPageId$ = currentPageSubjectId.pipe();

export const currentLeftPage$ = combineLatest([leftPages$, currentPageId$]).pipe(
  map(([leftPages, currentPageId]) => leftPages[currentPageId])
);

export const currentRightPage$ = combineLatest([rightPages$, currentPageId$]).pipe(
  map(([rightPages, currentPageId]) => rightPages[currentPageId + 1])
);