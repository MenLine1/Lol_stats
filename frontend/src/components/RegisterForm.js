import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                username,
                password
            });

            if (response.status === 201) {
                setSuccess(true);
                toast.success('Registered successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError('Failed to register');
                toast.error('Failed to register');
            }
        } catch (error) {
            setError('Failed to register');
            toast.error('Failed to register');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full p-2 border rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                    {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                    {success && <p className="mt-2 text-green-500 text-sm">Registration successful!</p>}
                </form>
                <div className="mt-4 text-sm text-center">
                    <p>
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default RegisterForm;
