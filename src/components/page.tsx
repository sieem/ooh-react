import { IPage } from '../interfaces/page.interface';

export function Page({ pageData }: { pageData: IPage }) {
  const backgroundStyle = pageData.background_image ? { backgroundImage: `url(https://api.o-o-h.be/uploads/${pageData.background_image})` } : {};

  return <main className='h-full bg-contain bg-no-repeat bg-center flex flex-col' style={backgroundStyle}>
    <div className='w-2/3 pt-24 mx-auto flex-grow' dangerouslySetInnerHTML={{ __html: pageData.article }}></div>
    <div className='text-xs' dangerouslySetInnerHTML={{ __html: pageData.credits}}></div>
  </main>;
}
