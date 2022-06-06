import { combineLatest, map } from 'rxjs';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';

export const totalPages$ = combineLatest([leftPages$, rightPages$]).pipe(
  map(([leftPages, rightPages]) => leftPages.length > rightPages.length ? leftPages.length : rightPages.length )
)