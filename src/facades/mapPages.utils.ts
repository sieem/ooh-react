import { PageDto, IPage } from '../interfaces/page.interface';

export const mapPageDtoToIPage = (pageDto: PageDto): IPage => ({
  article: pageDto.article,
  backgroundImage: pageDto.background_image,
  backgroundImageCover: pageDto.background_image_cover,
  credits: pageDto.credits,
  fold: !!+pageDto.fold,
  id: +pageDto.id,
  ordering: +pageDto.ordering,
  title: pageDto.title,
  videoBackward: pageDto.video_backward,
  videoForward: pageDto.video_forward,
  whiteText: !!+pageDto.white_text,
});
