import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const Nvgt = useNavigate();
    const url = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${url}/posts/login`, { email, password });

            localStorage.setItem('token', response.data.token);
            setSuccessMessage('Login successful!');
            Nvgt('/posts');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setErrorMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        Nvgt('/signup');
    };

    return (
        <div className="min-h-screen bg-yellow-700 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-8 mt-10 bg-black">
                <h2 className="text-4xl font-semibold text-center text-yellow-800 mb-6 font-serif">Login</h2>
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
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
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg font-medium ${loading ? 'bg-gray-500' : 'bg-yellow-700 hover:bg-yellow-600'
                            } text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 font-serif`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <button
                            onClick={handleSignup}
                            className="ml-2 text-yellow-700 font-semibold hover:text-yellow-600"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
