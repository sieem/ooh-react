export const pageLimiter = (goUp: boolean, currentPageId: number, totalPages: number ): number =>  {
  let newPageId = goUp ? currentPageId + 1 : currentPageId - 1;
  if (newPageId < 0) newPageId = 0;
  if (newPageId > totalPages - 1) newPageId = totalPages - 1;

  return newPageId;
}
