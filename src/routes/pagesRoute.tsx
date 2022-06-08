import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useEffect } from 'react';
import { MenuBar } from '../components/menuBar';
import { Pages } from '../components/pages';
import { currentPageId$ } from '../store/currentPage.store';
import { Fold } from '../components/fold';
import { isChrome, isMobile } from 'react-device-detect';
import { useScreenOrientation } from '../hooks/screenOrientation.hook';
import { scrollEvent$ } from '../store/scroll.store';
import { combineLatest, firstValueFrom } from 'rxjs';
import { pageLimiter } from '../utils/pageLimiter.util';
import { totalPages$ } from '../store/totalPages.store';
import { useBehaviorSubject } from '../hooks/useBehaviorSubject.hook';

export function PagesRoute() {
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();
  const screenOrientation = useScreenOrientation();
  const [_, setCurrentPageId] = useBehaviorSubject(currentPageId$);

  const changePage = async (goUp: boolean) => {
    const [_totalPages, _currentPageId] = await firstValueFrom(combineLatest([totalPages$, currentPageId$]));
    const newPageId = pageLimiter(goUp, _currentPageId, _totalPages);

    if (newPageId !== _currentPageId) {
      navigate(`/page/${newPageId * 2}-${(newPageId * 2) + 1}`, { replace: true });
    }
  }

  const handlers = useSwipeable({
    trackMouse: true,
    onSwiped: ({ dir }) => {
      changePage(['Up', 'Right'].includes(dir))
    },
  });

  useEffect(() => {
    const sub = scrollEvent$.subscribe(changePage);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      return navigate('/page/0-1', { replace: true });
    }

    setCurrentPageId(+pageIdEven / 2);
  }, [pageIdEven]);

  let className = 'w-screen h-screen';

  if (isMobile && screenOrientation.includes('portrait')) {
    className = isChrome
      ? 'w-landscape-chrome h-landscape rotate-90 translate-y-[240px] -translate-x-[239px]'
      : 'w-landscape h-landscape rotate-90 translate-y-[211px] -translate-x-[267px]';
  }

  if (isMobile && isChrome && screenOrientation.includes('landscape')) {
    className = 'h-chrome';
  }

  return <main className={className} {...handlers}>
    <MenuBar />
    <Pages />
    <Fold />
  </main>;
}
