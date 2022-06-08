import { leftPages$, overviewPage$, rightPages$ } from '../facades/pages.facade';
import { Page } from './page';
import { currentPageId$ } from '../store/currentPage.store';
import { totalPages$ } from '../store/totalPages.store';
import { useObservable } from '../hooks/useObservable.hook';
import { OverviewPage } from './overview';

export function Pages() {
  const leftPages = useObservable(leftPages$) ?? [];
  const rightPages = useObservable(rightPages$) ?? [];
  const [overViewPageLeft, overViewPageRight] = useObservable(overviewPage$) ?? [[], []];
  const currentPageId = useObservable(currentPageId$) ?? 0;
  const totalPages = useObservable(totalPages$) ?? 0;


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
    <main className='h-full w-full overflow-hidden flex'>
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
