import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MenuBar } from '../components/menuBar';
import { Pages } from '../components/pages';
import { setCurrentPageId } from '../store/currentPage.store';
import { Fold } from '../components/fold';
import { isMobile } from 'react-device-detect';
import { useScreenOrientation } from '../hooks/screenOrientation.hook';

export function PagesRoute() {
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();
  const screenOrientation = useScreenOrientation();

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      return navigate('/page/0-1', { replace: true });
    }

    setCurrentPageId(+pageIdEven / 2);
  }, [pageIdEven]);

  const className = isMobile && screenOrientation.includes('portrait') ? 'w-[100vh] h-[100vw] rotate-90 translate-y-[230px] -translate-x-[230px]' : 'w-screen h-screen';


  return <main className={className + ' overflow-hidden'}>
    <MenuBar />
    <Pages />
    <Fold />
  </main>;
}
