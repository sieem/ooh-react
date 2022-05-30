import { PageDto, IPage } from '../interfaces/page.interface';

export const mapPageDtoToIPage = (pageDto: PageDto): IPage => ({
  article: pageDto.article,
  background_image: pageDto.background_image,
  background_image_cover: pageDto.background_image_cover,
  credits: pageDto.credits,
  fold: !!+pageDto.fold,
  id: +pageDto.id,
  ordering: +pageDto.ordering,
  title: pageDto.title,
  video_backward: pageDto.video_backward,
  video_forward: pageDto.video_forward,
  white_text: !!+pageDto.white_text,
});
