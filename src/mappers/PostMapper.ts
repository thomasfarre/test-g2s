import { Post } from '../models/Post';

interface PostDto {
  id: number;
  title: string;
  body: string;
}

export const postDtoToPost = (postDto: PostDto): Post => {
  return {
    id: postDto.id,
    title: postDto.title,
    body: postDto.body,
  };
};
