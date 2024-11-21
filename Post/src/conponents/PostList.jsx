import React, { useEffect, useState } from 'react';
import { deletePost, fetchPosts } from '../api/apis';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then((response) => setPosts(response.data));
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
        setPosts(posts.filter(post => post._id !== id));
    };

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.imageUrl} alt={post.title} width="200" />
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
