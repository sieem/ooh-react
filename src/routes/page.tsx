import { IPage } from '../interfaces/page.interface';

export function Page({ pageData }: { pageData: IPage }) {
  return <main className="p-2">
    <p>{pageData.alias}</p>
  </main>;
}
