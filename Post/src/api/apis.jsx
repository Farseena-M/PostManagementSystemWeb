import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const fetchPosts = () => API.get('/all-posts');
export const createPost = (postData) => API.post('/create', postData);
export const getPost = (id) => API.get(`/fetch/${id}`);
export const updatePost = (id, postData) => API.patch(`/${id}`, postData);
export const deletePost = (id) => API.delete(`/${id}`);
