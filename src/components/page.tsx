import { baseUrl } from '../constants/baseUrl';
import { IPage } from '../interfaces/page.interface';
import { Video } from './video';

export function Page({ pageData, side }: { pageData: IPage, side: 'left' | 'right' }) {
  const style = {
    ...(pageData.backgroundImage ? { backgroundImage: `url(${baseUrl}/${pageData.backgroundImage})` } : {}),
    ...(pageData.backgroundImageCover ? { backgroundSize: 'cover' } : {}),
    
    // exceptions for the first page with the OOH logo
    ...(pageData.ordering === 0 ? { backgroundSize: '94px' } : {}),
    ...(pageData.ordering === 0 && side === 'left' ? { backgroundPosition: 'right' } : {}),
    ...(pageData.ordering === 0 && side === 'right' ? { backgroundPosition: 'left' } : {}),
  };

  const creditsStyle = {
    ...(pageData.whiteText ? { color: 'white' } : {}),
    ...(pageData.whiteText ? { textShadow: '0 0 5px black' } : {}),
  };

  return <main className='h-full bg-contain bg-no-repeat bg-center flex flex-col' style={style}>
    {pageData.videoForward && pageData.videoBackward && <Video pageId={pageData.id} videoForward={pageData.videoForward} videoBackward={pageData.videoBackward} />}
    {pageData.article && <div className='w-2/3 pt-24 mx-auto flex-grow' dangerouslySetInnerHTML={{ __html: pageData.article }} />}
    {pageData.credits && <div className='text-sm ml-8 mr-4 mb-4 mt-auto justify-self-end md:text-xs' style={creditsStyle} dangerouslySetInnerHTML={{ __html: pageData.credits }} />}
  </main>;
}
