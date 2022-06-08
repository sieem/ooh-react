import { IPage } from '../interfaces/page.interface';
export const determinePage = ({id, side}: IPage, leftPages: IPage[], rightPages: IPage[]) => {
  const arrayToSearchIn = side === 'left' ? leftPages : rightPages;
  return arrayToSearchIn.findIndex((page) => page.id === id); 
};
