import { useSwipeable } from 'react-swipeable';
import { leftPages$, overviewPage$, rightPages$ } from '../facades/pages.facade';
import { Page } from './page';
import { useNavigate } from 'react-router-dom';
import { currentPageId$ } from '../store/currentPage.store';
import { totalPages$ } from '../store/totalPages.store';
import { useObservable } from '../hooks/useObservable.hook';
import { scrollEvent$ } from '../store/scroll.store';
import { useEffect } from 'react';
import { combineLatest, firstValueFrom } from 'rxjs';
import { pageLimiter } from '../utils/pageLimiter.util';
import { OverviewPage } from './overview';

export function Pages() {
  const leftPages = useObservable(leftPages$) ?? [];
  const rightPages = useObservable(rightPages$) ?? [];
  const [overViewPageLeft, overViewPageRight] = useObservable(overviewPage$) ?? [[], []];
  const currentPageId = useObservable(currentPageId$) ?? 0;
  const totalPages = useObservable(totalPages$) ?? 0;
  const navigate = useNavigate();

  const changePage = async (goUp: boolean) => {
    const [_totalPages, _currentPageId] = await firstValueFrom(combineLatest([totalPages$, currentPageId$]));
    const newPageId = pageLimiter(goUp, _currentPageId, _totalPages);

    if (newPageId !== _currentPageId) {
      navigate(`/page/${newPageId * 2}-${(newPageId * 2) + 1}`, { replace: true });
    }
  }

  const handlers = useSwipeable({
    trackMouse: true,
    onSwiped: ({ dir }) => changePage(dir === 'Up'),
  });

  useEffect(() => {
    const sub = scrollEvent$.subscribe(changePage);
    return () => sub.unsubscribe();
  }, []);

  const leftStyle = {
    transform: `translateY(-${100 * currentPageId}%)`,
  };

  const rightStyle = {
    transform: `translateY(-${100 * ( totalPages - currentPageId - 1 )}%)`,
  };

  // Make room for the overview page, which is the penultimate one
  const leftPagesWithOutLast = leftPages.slice(0, -1);
  const rightPagesWithoutLast = rightPages.slice(0, -1).reverse();

  const lastLeftPage = leftPages.slice().reverse()[0] ?? {};
  const lastRightPage = rightPages.slice().reverse()[0] ?? {};

  return (
    <main className='h-screen w-screen overflow-hidden flex' {...handlers}>
      <div style={leftStyle} className='left forward  h-full w-1/2 transition-transform duration-700'>
        {leftPagesWithOutLast.map(leftPage => (
          <Page pageData={leftPage} side="left" key={leftPage.id} />
        ))}
        <OverviewPage overviewData={overViewPageLeft} />
        <Page pageData={lastLeftPage} side="left" key={lastLeftPage.id} />
      </div>

      <div style={rightStyle} className='right backwards  h-full w-1/2 transition-transform duration-700'>
        <Page pageData={lastRightPage} side="left" key={lastRightPage.id} />
        <OverviewPage overviewData={overViewPageRight} />
        {rightPagesWithoutLast.map(rightPage => (
          <Page pageData={rightPage} side="right" key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
