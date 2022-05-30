import { useParams } from 'react-router-dom';

export function Page() {
  const { pageIdEven, pageIdOdd } = useParams();

  return <main className="p-2">
    <h2>{pageIdEven}-{pageIdOdd}</h2>
  </main>;
}