
import { useObservable } from '../hooks/useObservable.hook';
import { fold$ } from '../store/fold.store';
import foldUrl from '../assets/images/fold.png'

export function Fold() {
  const fold = useObservable(fold$, false);

  const style = {
    backgroundImage: `url(${foldUrl})`,
    opacity: fold ? 1 : 0,
  };

  return <div style={style} className='fixed top-0 left-1/2 -translate-x-1/2 w-[80px] h-full z-40 bg-repeat-y bg-center transition-opacity duration-500'></div>
}
