import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { firstValueFrom } from 'rxjs';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';
import { IPage } from '../interfaces/page.interface';
import { Page } from './page';

export function Pages() {
  const [leftPages, setLeftPages] = useState<IPage[]>([]);
  const [rightPages, setRightPages] = useState<IPage[]>([]);
  const { pageIdEven, pageIdOdd } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageIdEven || !pageIdOdd) {
      navigate('/page/0-1', { replace: true });
    }

    firstValueFrom(leftPages$).then(setLeftPages);
    firstValueFrom(rightPages$).then(setRightPages);
  }, []);

  return (
    <main className="p-2">
      <nav className='flex uppercase justify-around'>
        <Link to={'/page/0-1'}>ooh</Link>
        <Link to={'/page/16-17'}>about</Link>
        <Link to={'/page/32-33'}>all looks</Link>
        <div className='whitespace-nowrap'>[{pageIdEven}-{pageIdOdd}] | <Link to={'/page/34-35'}>35</Link></div>
      </nav>

      <div className="container forward">
        {leftPages.map(leftPage => (
          <Page pageData={leftPage} key={leftPage.id} />
        ))}
      </div>

      <div className="container backwards">
        {rightPages.map(rightPage => (
          <Page pageData={rightPage} key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
