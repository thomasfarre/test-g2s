import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { usePost } from '../../src/composables/usePost';

vi.mock('../../src/stores/PostStore', () => ({
  usePostStore: vi.fn(() => {
    const posts = ref<{ id: number; title: string; body: string }[]>([]);
    return {
      loadPosts: vi.fn().mockImplementation(async () => {
        posts.value = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
        return posts.value;
      }),
      addPost: vi.fn().mockImplementation(async ({ title, body }) => {
        const newPost = {
          id: 2,
          title,
          body
        };
        posts.value.push(newPost);
        return newPost;
      }),
      editPost: vi.fn().mockImplementation(async (id, { title, body }) => {
        const index = posts.value.findIndex(p => p.id === id);
        if (index !== -1) {
          posts.value[index] = {
            id,
            title,
            body
          };
        }
        return posts.value[index];
      }),
      removePost: vi.fn().mockImplementation(async (id) => {
        posts.value = posts.value.filter(p => p.id !== id);
      }),
      posts,
    };
  }),
}));

describe('usePost composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should load posts', async () => {
    const { loadPosts, posts } = usePost();
    await loadPosts();
    expect(posts.value).toEqual([{ id: 1, title: 'Post 1', body: 'Content 1' }]);
  });

  it('should add a post', async () => {
    const { addPost, posts } = usePost();
    await addPost('New Post', 'New Content');
    expect(posts.value).toContainEqual({ id: 2, title: 'New Post', body: 'New Content' });
  });

  it('should edit a post', async () => {
    const { editPost, posts } = usePost();
    posts.value = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
    await editPost(1, 'Updated Post', 'Updated Content');
    expect(posts.value).toContainEqual({ id: 1, title: 'Updated Post', body: 'Updated Content' });
  });

  it('should remove a post', async () => {
    const { deletePost, posts } = usePost();
    posts.value = [{ id: 1, title: 'Post 1', body: 'Content 1' }];
    await deletePost(1);
    expect(posts.value).not.toContainEqual({ id: 1, title: 'Post 1', body: 'Content 1' });
  });
});
