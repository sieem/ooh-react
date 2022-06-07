import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MenuBar } from '../components/menuBar';
import { Pages } from '../components/pages';
import { setCurrentPageId } from '../store/currentPage.store';
import { Fold } from '../components/fold';

export function PagesRoute() {
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      return navigate('/page/0-1', { replace: true });
    }

    setCurrentPageId(+pageIdEven / 2);
  }, [pageIdEven]);


  return <main>
    <MenuBar />
    <Pages />
    <Fold />
  </main>;
}
