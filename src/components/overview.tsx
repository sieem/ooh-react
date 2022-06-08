import { IOverviewPage } from '../interfaces/overviewPage.interface';
import { Link } from 'react-router-dom';
import { baseUrl } from '../constants/baseUrl';

export function OverviewPage({ overviewData }: { overviewData: IOverviewPage[] }) {

  return <div className='h-full grid grid-cols-2 grid-rows-2'>
    {overviewData.map(({ page, backgroundImage, id}) => {
      const style = { backgroundImage: `url(${baseUrl}/${backgroundImage})` };
      const pageLink = `${page * 2}-${(page * 2) + 1}`;

      return <Link className='group flex bg-contain bg-no-repeat bg-center hover:no-underline' to={`/page/${pageLink}`} style={style} key={id}>
        <div className='flex-grow flex items-center justify-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:bg-white/[.8]'>{pageLink}</div>
      </Link>
    })}
  </div>;
}
