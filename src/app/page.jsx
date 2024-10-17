'use client';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="container w-3/4 mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:bg-slate-300 cursor-pointer">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
