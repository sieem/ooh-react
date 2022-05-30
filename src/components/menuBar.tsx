import { Link, useParams } from 'react-router-dom';

export function MenuBar() {
  const { pageIdEven, pageIdOdd } = useParams();

  return <nav className='fixed w-full flex uppercase justify-around p-4'>
    <Link to={'/page/0-1'}>ooh</Link>
    <Link to={'/page/16-17'}>about</Link>
    <Link to={'/page/32-33'}>all looks</Link>
    <div className='whitespace-nowrap'>[{pageIdEven}-{pageIdOdd}] | <Link to={'/page/34-35'}>35</Link></div>
  </nav>;
}
