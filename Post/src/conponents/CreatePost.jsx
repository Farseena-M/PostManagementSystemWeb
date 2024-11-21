import React, { useRef, useState } from 'react';
import { createPost } from '../api/apis';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const imageInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
        const imageFiles = files.map((file) => URL.createObjectURL(file));
        setSelectedImages((prevImages) => [...prevImages, ...imageFiles]);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);

        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages.splice(index, 1);
        setSelectedImages(updatedSelectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        images.forEach((img) => {
            formData.append('images', img);
        });

        await createPost(formData);
        setTitle('');
        setDescription('');
        setImages([]);
        setSelectedImages([]);
        if (imageInputRef.current) {
            imageInputRef.current.value = null;
        }
    };

    return (
        <div className="min-h-screen bg-yellow-700 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg p-8 mt-10 bg-black">
                <h2 className="text-4xl font-semibold text-center text-yellow-800 mb-6 font-serif">Create a New Post</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Images</label>
                        <input
                            type="file"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            accept="image/*"
                            name='image'
                            multiple
                            onChange={handleImageChange}
                            ref={imageInputRef}
                        />
                        <div className="grid grid-cols-10 mt-2 gap-2">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image} alt={`uploaded-${index}`} className="w-16 h-16 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-lg hover:bg-red-700 flex items-center justify-center"
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="description"
                            placeholder="Write your post description here"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 h-32 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 font-serif"
                    >
                        Send Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;