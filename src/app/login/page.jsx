'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    setErrorMessage('');
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('https://backend.profferdeals.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        router.push('/');
      } else {
        setErrorMessage(data.message || 'Login Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded-lg p-8 w-96" onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl text-center mb-5">Login</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <input
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
