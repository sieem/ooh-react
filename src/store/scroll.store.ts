import { fromEvent, map, filter, Observable, throttleTime } from 'rxjs';

const scrollAnimationTimeout = 750;
let lastTimeStamp = 0;

export const scrollEvent$: Observable<boolean> = fromEvent(window, 'wheel').pipe(
  filter(({ deltaY }: any) => Math.abs(deltaY) > 75),
  filter(({ timeStamp }) => {
    const shouldScroll = timeStamp - lastTimeStamp > 100;

    lastTimeStamp = timeStamp;
    return shouldScroll;
  }),
  throttleTime(scrollAnimationTimeout),
  map(({ deltaY }: any) => deltaY > 0),
);
