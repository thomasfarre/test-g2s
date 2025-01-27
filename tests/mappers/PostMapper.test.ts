import { describe, it, expect } from 'vitest';
import { postDtoToPost } from '../../src/mappers/PostMapper';
import { Post } from '../../src/models/Post';

describe('postDtoToPost', () => {
  it('should map PostDto to Post', () => {
    const postDto = { id: 1, title: 'Post 1', body: 'Content 1' };
    const expectedPost: Post = { id: 1, title: 'Post 1', body: 'Content 1' };

    const post = postDtoToPost(postDto);

    expect(post).toEqual(expectedPost);
  });

  it('should handle missing fields gracefully', () => {
    const postDto = { id: 1, title: 'Post 1', body: '' };
    const expectedPost: Post = { id: 1, title: 'Post 1', body: '' };

    const post = postDtoToPost(postDto);

    expect(post).toEqual(expectedPost);
  });
});
