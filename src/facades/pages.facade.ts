import { switchMap, Observable, map, shareReplay, combineLatest, firstValueFrom } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { IPage } from '../interfaces/page.interface';
import { determinePage } from '../utils/determinePage.util';
import { mapPageDtoToIPage } from './mapPages.utils';
import { IOverviewPage } from '../interfaces/overviewPage.interface';

export const leftPages$: Observable<IPage[]> = fromFetch('https://api.o-o-h.be/articles/l').pipe(
  switchMap((res) => res.json()),
  map((pages) => [
    ...pages.map(mapPageDtoToIPage),

  ]),
  shareReplay({ refCount: false, bufferSize: 1 }),
);

export const rightPages$: Observable<IPage[]> = fromFetch('https://api.o-o-h.be/articles/r').pipe(
  switchMap((res) => res.json()),
  map((pages) => pages.map(mapPageDtoToIPage)),
  shareReplay({ refCount: false, bufferSize: 1 }),
);

export const overviewPage$: Observable<IOverviewPage[][]> = fromFetch('https://api.o-o-h.be/overview').pipe(
  switchMap((res) => res.json()),
  map((pages) => pages.map(mapPageDtoToIPage)),
  switchMap(async (pages: IPage[]) => {
    const [leftPages, rightPages] = await firstValueFrom(combineLatest([leftPages$, rightPages$]));
    return pages.map((page) => ({
      backgroundImage: page.backgroundImage,
      page: determinePage(page, leftPages, rightPages),
    }));
  }),
  map((pages: IOverviewPage[]) => [
    pages.filter((_: unknown, i: number) => i < 2 || (i > 3 && i < 6)),
    pages.filter((_: unknown, i: number) => !(i < 2 || (i > 3 && i < 6))),
  ]),
  shareReplay({ refCount: false, bufferSize: 1 }),
);
