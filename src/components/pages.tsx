import { useSwipeable } from 'react-swipeable';
import { firstValueFrom, combineLatest } from 'rxjs';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';
import { Page } from './page';
import { useNavigate } from 'react-router-dom';
import { currentPageId$, setCurrentPageId } from '../store/currentPage.store';
import { totalPages$ } from '../store/totalPages.store';
import { useObservable } from '../hooks/useObservable.hook';

export function Pages() {
  const leftPages = useObservable(leftPages$) ?? [];
  const rightPages = useObservable(rightPages$) ?? [];

  const navigate = useNavigate();

  const changePage = async (nextPage: boolean) => {
    const [ totalPages, currentPage ] = await firstValueFrom(combineLatest([totalPages$, currentPageId$]))
    let newPageId = nextPage ? currentPage + 1 : currentPage - 1;
    if (newPageId < 0) newPageId = 0;
    if (newPageId > totalPages) newPageId = totalPages;

    navigate(`/page/${newPageId}-${newPageId + 1}`, { replace: true });
    setCurrentPageId(newPageId);
  }

  const handlers = useSwipeable({
    onSwiped: ({ dir }) => changePage(dir === 'Up'),
  });

  const handleScroll = (event) => console.log(event);

  return (
    <main className='h-screen w-screen overflow-hidden flex' {...handlers} onWheel={handleScroll}>
      <div className='left forward  h-full w-1/2'>
        {leftPages.map(leftPage => (
          <Page pageData={leftPage} key={leftPage.id} />
        ))}
      </div>

      <div className='right backwards  h-full w-1/2'>
        {rightPages.map(rightPage => (
          <Page pageData={rightPage} key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
