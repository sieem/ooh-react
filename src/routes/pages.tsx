import { useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
export function Pages() {
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      navigate('/page/0-1', { replace: true });
    }
  });

  return (
    <main className="p-2">
      <nav className='flex uppercase justify-around'>
        <Link to={'/page/0-1'}>ooh</Link>
        <Link to={'/page/16-17'}>about</Link>
        <Link to={'/page/32-33'}>all looks</Link>
        <div className='whitespace-nowrap'>[{pageIdEven}-{pageIdOdd}] | <Link to={'/page/34-35'}>35</Link></div>
      </nav>
      <Outlet />
    </main>
  );
}