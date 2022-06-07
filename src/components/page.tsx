import { IPage } from '../interfaces/page.interface';

export function Page({ pageData, side }: { pageData: IPage, side: 'left' | 'right' }) {
  const style = {
    ...(pageData.background_image ? { backgroundImage: `url(https://api.o-o-h.be/uploads/${pageData.background_image})` } : {}),
    ...(pageData.background_image_cover ? { backgroundSize: 'cover' } : {}),
    
    // exceptions for the first page with the OOH logo
    ...(pageData.ordering === 0 ? { backgroundSize: '94px' } : {}),
    ...(pageData.ordering === 0 && side === 'left' ? { backgroundPosition: 'right' } : {}),
    ...(pageData.ordering === 0 && side === 'right' ? { backgroundPosition: 'left' } : {}),
  };

  const creditsStyle = {
    ...(pageData.white_text ? { color: 'white' } : {}),
    ...(pageData.white_text ? { textShadow: '0 0 5px black' } : {}),
  };

  return <main className='h-full bg-contain bg-no-repeat bg-center flex flex-col' style={style}>
    <div className='w-2/3 pt-24 mx-auto flex-grow' dangerouslySetInnerHTML={{ __html: pageData.article }}></div>
    <div className='text-xs ml-8 mr-4 mb-4' style={creditsStyle} dangerouslySetInnerHTML={{ __html: pageData.credits}}></div>
  </main>;
}
