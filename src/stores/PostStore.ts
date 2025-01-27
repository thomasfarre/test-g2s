import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePostService } from '../services/UsePostService';
import { Post } from '../models/Post';

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);
  const { fetchPosts, createPost, updatePost, deletePost } = usePostService();

  const loadPosts = async () => {
    posts.value = await fetchPosts();
  };

  const addPost = async (post: { title: string; body: string }) => {
    const newPost = await createPost(post);
    posts.value.unshift(newPost);
  };

  const editPost = async (id: number, post: { title: string; body: string }) => {
    const updatedPost = await updatePost(id, post);
    const index = posts.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.value[index] = updatedPost;
    }
  };

  const removePost = async (id: number) => {
    await deletePost(id);
    posts.value = posts.value.filter((p) => p.id !== id);
  };

  return { posts, loadPosts, addPost, editPost, removePost };
});
