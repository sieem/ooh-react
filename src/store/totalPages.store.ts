import { map } from 'rxjs';
import { leftPages$ } from '../facades/pages.facade';

export const totalPages$ = leftPages$.pipe(
  map((leftPages) => leftPages.length + 1) // to account for the overview page
);
