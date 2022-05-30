import { IPage } from '../interfaces/page.interface';

export function Page({ pageData }: { pageData: IPage }) {
  const backgroundStyle = pageData.background_image ? { backgroundImage: `url(https://api.o-o-h.be/uploads/${pageData.background_image})` } : {};

  return <main className="h-full" style={backgroundStyle}>
    <div dangerouslySetInnerHTML={{ __html: pageData.article }}></div>
    <div dangerouslySetInnerHTML={{ __html: pageData.credits}}></div>
  </main>;
}
