import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePostStore } from '../../src/stores/PostStore';

vi.mock('../../src/services/UsePostService', () => ({
  usePostService: vi.fn(() => ({
    fetchPosts: vi.fn().mockResolvedValue([{ id: 1, title: 'Post 1', body: 'Content 1' }]),
    createPost: vi.fn().mockResolvedValue({ id: 2, title: 'New Post', body: 'New Content' }),
    updatePost: vi.fn().mockResolvedValue({ id: 1, title: 'Updated Post', body: 'Updated Content' }),
    deletePost: vi.fn().mockResolvedValue((id: number) => undefined),
  })),
}));

describe('usePostStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should load posts', async () => {
    const store = usePostStore();
    await store.loadPosts();

    expect(store.posts).toEqual([{ id: 1, title: 'Post 1', body: 'Content 1' }]);
  });

  it('should add a post', async () => {
    const store = usePostStore();
    await store.addPost({ title: 'New Post', body: 'New Content' });

    expect(store.posts).toContainEqual({ id: 2, title: 'New Post', body: 'New Content' });
  });

  it('should edit a post', async () => {
    const store = usePostStore();
    store.posts = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
    await store.editPost(1, { title: 'Updated Post', body: 'Updated Content' });

    expect(store.posts).toContainEqual({ id: 1, title: 'Updated Post', body: 'Updated Content' });
  });

  it('should remove a post', async () => {
    const store = usePostStore();
    store.posts = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
    await store.removePost(1);

    expect(store.posts).not.toContainEqual({ id: 1, title: 'Post 1', body: 'Content 1' });
  });
});
