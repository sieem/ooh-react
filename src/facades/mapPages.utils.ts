import { PageDto, IPage } from '../interfaces/page.interface';

export const mapPageDtoToIPage = (pageDto: PageDto): IPage => ({
  id: +pageDto.id,
  article: pageDto.article,
  backgroundImage: pageDto.background_image,
  backgroundImageCover: pageDto.background_image_cover,
  credits: pageDto.credits,
  fold: !!+pageDto.fold,
  side: pageDto.position === 'l' ? 'left' : 'right',
  showInOverview: !!+pageDto.show_in_overview,
  overviewOrdering: +pageDto.overview_ordering,
  ordering: +pageDto.ordering,
  title: pageDto.title,
  videoBackward: pageDto.video_backward,
  videoForward: pageDto.video_forward,
  whiteText: !!+pageDto.white_text,
});
