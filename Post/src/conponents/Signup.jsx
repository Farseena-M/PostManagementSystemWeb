import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const Nvgt = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://postmanagementsystemrestapi.onrender.com/posts/signup`, {
                username,
                email,
                password,
            });
            setSuccessMessage('Account created successfully!');
            setErrorMessage('');
            Nvgt('/')
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('User already exists.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-yellow-700 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto p-8 bg-black rounded-lg shadow-md">
                <h2 className="text-4xl font-semibold text-center text-yellow-800 mb-6 font-serif">Sign Up</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="mb-4 text-green-500 text-sm text-center">{successMessage}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-700 text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
