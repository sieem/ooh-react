import { combineLatest, map } from 'rxjs';
import { currentLeftPage$, currentRightPage$ } from "./currentPage.store";

export const fold$ = combineLatest([currentLeftPage$, currentRightPage$]).pipe(
  map(([leftPage, rightPage]) => leftPage?.fold ?? rightPage?.fold ?? false)
);
