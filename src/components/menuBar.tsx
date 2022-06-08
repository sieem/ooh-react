import { Link } from 'react-router-dom';
import { currentPageId$ } from '../store/currentPage.store';
import { totalPages$ } from '../store/totalPages.store';
import { useObservable } from '../hooks/useObservable.hook';

export function MenuBar() {
  const currentPageId = useObservable(currentPageId$) ?? 0;
  const totalPages = useObservable(totalPages$) ?? 0;

  return <nav className='fixed w-full flex uppercase justify-around p-4 z-50'>
    <Link to={'/page/0-1'}>ooh</Link>
    <Link to={'/page/16-17'}>about</Link>
    <Link to={`/page/${(totalPages - 2) * 2}-${((totalPages - 2) * 2) + 1}`}>all looks</Link>
    <div className='whitespace-nowrap w-[120px] text-right'>[{currentPageId * 2}-{currentPageId * 2 + 1}] | <Link to={`/page/${(totalPages - 1) * 2}-${((totalPages - 1) * 2) + 1}`}>{(totalPages - 1) * 2}</Link></div>
  </nav>;
}
