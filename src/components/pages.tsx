import { useSwipeable } from 'react-swipeable';
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
  const currentPageId = useObservable(currentPageId$) ?? 0;
  const totalPages = useObservable(totalPages$) ?? 0;

  const navigate = useNavigate();

  const changePage = async (nextPage: boolean) => {
    let newPageId = nextPage ? currentPageId + 1 : currentPageId - 1;
    if (newPageId < 0) newPageId = 0;
    if (newPageId > totalPages - 1) newPageId = totalPages - 1;

    navigate(`/page/${newPageId}-${newPageId + 1}`, { replace: true });
    setCurrentPageId(newPageId);
  }

  const handlers = useSwipeable({
    onSwiped: ({ dir }) => changePage(dir === 'Up'),
  });

  const handleScroll = (event) => console.log(event);

  const leftStyle = {
    transform: `translateY(-${100 * currentPageId}%)`,
  };

  const rightStyle = {
    transform: `translateY(-${100 * ( totalPages - currentPageId - 1 )}%)`,
  };

  return (
    <main className='h-screen w-screen overflow-hidden flex' {...handlers} onWheel={handleScroll}>
      <div style={leftStyle} className='left forward  h-full w-1/2'>
        {leftPages.map(leftPage => (
          <Page pageData={leftPage} key={leftPage.id} />
        ))}
      </div>

      <div style={rightStyle} className='right backwards  h-full w-1/2'>
        {rightPages.map(rightPage => (
          <Page pageData={rightPage} key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
