import { PostResponse } from '../types/postTypes';
import axiosInstance from './axiosInstance';

export const getPosts = async (): Promise<PostResponse[]> => {
	const response = await axiosInstance.get('/posts');
	return response.data;
};

export const getPostById = async (postId: string): Promise<PostResponse> => {
	const response = await axiosInstance.get(`/posts/${postId}`);
	return response.data;
};

export const getPostUserById = async (postId: string): Promise<PostResponse[]> => {
	const response = await axiosInstance.get(`/posts/user/${postId}`);
	return response.data;
};
