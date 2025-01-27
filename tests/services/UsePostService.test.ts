import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { usePostService } from '../../src/services/UsePostService';
import { POST_API_URL } from '../../src/constants';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('usePostService', () => {
  const { fetchPosts, createPost, updatePost, deletePost } = usePostService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch posts', async () => {
    const mockPosts = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
    mockedAxios.get.mockResolvedValue({ data: mockPosts });

    const posts = await fetchPosts();
    expect(posts).toEqual(mockPosts);
    expect(mockedAxios.get).toHaveBeenCalledWith(POST_API_URL);
  });

  it('should create a post', async () => {
    const newPost = { title: 'New Post', body: 'New Content' };
    const createdPost = { id: 2, ...newPost };
    mockedAxios.post.mockResolvedValue({ data: createdPost });

    const post = await createPost(newPost);
    expect(post).toEqual(createdPost);
    expect(mockedAxios.post).toHaveBeenCalledWith(POST_API_URL, newPost);
  });

  it('should update a post', async () => {
    const updatedPost = { id: 1, title: 'Updated Post', body: 'Updated Content' };
    mockedAxios.put.mockResolvedValue({ data: updatedPost });

    const post = await updatePost(1, updatedPost);
    expect(post).toEqual(updatedPost);
    expect(mockedAxios.put).toHaveBeenCalledWith(`${POST_API_URL}/1`, updatedPost);
  });

  it('should delete a post', async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deletePost(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith(`${POST_API_URL}/1`);
  });
});
