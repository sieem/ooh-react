export interface PageDto {
  alias: string;
  article: string;
  background_image: string;
  background_image_cover: string;
  credits: string;
  fold: string;
  id: string;
  ordering: string;
  overview_ordering: string;
  position: string;
  show_in_overview: string;
  title: string;
  video_backward: string;
  video_forward: string;
  white_text: string;
}

export interface IPage {
  article: string;
  backgroundImage: string;
  backgroundImageCover: string;
  credits: string;
  fold: boolean;
  id: number;
  ordering: number;
  title: string;
  videoBackward: string;
  videoForward: string;
  whiteText: boolean;
}
