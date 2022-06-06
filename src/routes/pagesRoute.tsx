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
      navigate('/page/0-1', { replace: true });
    }

    setCurrentPageId(pageIdEven);
  }, []);


  return <main>
    <MenuBar />
    <Pages />
    <Fold />
  </main>;
}
