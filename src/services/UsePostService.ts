import axios from 'axios';
import { POST_API_URL } from '../constants';
import { postDtoToPost } from '../mappers/PostMapper';
import { Post } from '../models/Post';

export const usePostService = () => {
  const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get(POST_API_URL);
    return response.data.map(postDtoToPost);
  };

  const createPost = async (post: { title: string; body: string }): Promise<Post> => {
    const response = await axios.post(POST_API_URL, post);
    return postDtoToPost(response.data);
  };

  const updatePost = async (id: number, post: { title: string; body: string }): Promise<Post> => {
    const response = await axios.put(`${POST_API_URL}/${id}`, post);
    return postDtoToPost(response.data);
  };

  const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${POST_API_URL}/${id}`);
  };

  return { fetchPosts, createPost, updatePost, deletePost };
};
