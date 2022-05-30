import { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { leftPages$ } from '../facades/leftPages.facade';
import { rightPages$ } from '../facades/rightPages.facade';
import { IPage } from '../interfaces/page.interface';
import { Page } from './page';

export function Pages() {
  const [leftPages, setLeftPages] = useState<IPage[]>([]);
  const [rightPages, setRightPages] = useState<IPage[]>([]);

  useEffect(() => {
    firstValueFrom(leftPages$).then(setLeftPages);
    firstValueFrom(rightPages$).then(setRightPages);
  }, []);

  return (
    <main className='h-screen w-screen overflow-hidden'>
      <div className='left forward  h-full'>
        {leftPages.map(leftPage => (
          <Page pageData={leftPage} key={leftPage.id} />
        ))}
      </div>

      <div className='right backwards  h-full'>
        {rightPages.map(rightPage => (
          <Page pageData={rightPage} key={rightPage.id} />
        ))}
      </div>
    </main>
  );
}
