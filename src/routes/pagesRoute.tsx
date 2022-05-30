import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MenuBar } from '../components/menuBar';
import { Pages } from '../components/pages';

export function PagesRoute() {
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      navigate('/page/0-1', { replace: true });
    }
  }, []);


  return <main>
    <MenuBar />
    <Pages />
  </main>;
}
