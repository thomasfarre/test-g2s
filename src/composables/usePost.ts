import { usePostStore } from '../stores/PostStore';

export const usePost = () => {
  const postStore = usePostStore();

  const loadPosts = async () => {
    await postStore.loadPosts();
  };

  const addPost = async (title: string, body: string) => {
    await postStore.addPost({ title, body });
  };

  const editPost = async (id: number, title: string, body: string) => {
    await postStore.editPost(id, { title, body });
  };

  const deletePost = async (id: number) => {
    await postStore.removePost(id);
  };

  return { loadPosts, addPost, editPost, deletePost, posts: postStore.posts };
};
