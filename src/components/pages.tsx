import { useSwipeable } from 'react-swipeable';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';
import { Page } from './page';
import { useNavigate } from 'react-router-dom';
import { currentPageId$, setCurrentPageId } from '../store/currentPage.store';
import { totalPages$ } from '../store/totalPages.store';
import { useObservable } from '../hooks/useObservable.hook';
import { scrollEvent$ } from '../store/scroll.store';
import { useEffect } from 'react';
import { combineLatest, firstValueFrom } from 'rxjs';
import { pageLimiter } from '../utils/pageLimiter.util';

export function Pages() {
  const leftPages = useObservable(leftPages$) ?? [];
  const rightPages = useObservable(rightPages$) ?? [];
  const currentPageId = useObservable(currentPageId$) ?? 0;
  const totalPages = useObservable(totalPages$) ?? 0;
  const navigate = useNavigate();

  const changePage = async (goUp: boolean) => {
    const [_totalPages, _currentPageId] = await firstValueFrom(combineLatest([totalPages$, currentPageId$]));
    const newPageId = pageLimiter(goUp, _currentPageId, _totalPages);

    if (newPageId !== _currentPageId) {
      navigate(`/page/${newPageId}-${newPageId + 1}`, { replace: true });
      setCurrentPageId(newPageId);
    }
  }

  const handlers = useSwipeable({
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

  return (
    <main className='h-screen w-screen overflow-hidden flex' {...handlers}>
      <div style={leftStyle} className='left forward  h-full w-1/2 transition-transform duration-700'>
        {leftPages.map(leftPage => (
          <Page pageData={leftPage} key={leftPage.id} />
        ))}
      </div>

      <div style={rightStyle} className='right backwards  h-full w-1/2 transition-transform duration-700'>
        {rightPages.map(rightPage => (
          <Page pageData={rightPage} key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
