// src/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch the list of blog files from the server or a predefined list
    const blogFiles = [
      { id: 'generate-jwt', title: 'FEWV Seconds of Learning How to Generate a JWT?', description: 'Learn how to generate a JSON Web Token (JWT) in just a few seconds.', tags: ['React', 'JavaScript'] },
      { id: 'learn-docker', title: 'FEWV Seconds of Learning How to Containerize?', description: 'Learn how to containerize your applications using Docker.', tags: ['Docker', 'Node.js'] },
      { id: 'learn-figma-react', title: 'FEWV Seconds of Learning Convert Figma to React?', description: 'Learn how to convert Figma designs to React components.', tags: ['Figma', 'React.js'] },
      { id: 'k8s-basics', title: 'Learn Kubernetes Basics in Just a Few Seconds', description: 'Get started with Kubernetes and learn the basics in just a few seconds.', tags: ['K8s', 'Node.js'] },
    ];
    setBlogs(blogFiles);
  }, []);

  return (
    <div className="blog-list container mx-auto p-4">
      <div className="py-36">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">Our Blogs</h1>
        <p className="mt-6 text-gray-300 text-center">
          Read our latest blogs and learn new skills in just a few seconds.
        </p>
        <ul className="space-y-8 mt-12">
          {blogs.map((blog) => (
            <li key={blog.id} className="bg-[#001313] p-8 rounded-lg shadow-sm shadow-green-300 md:px-8 md:py-8 hover:shadow-green-300">
              <div className="flex justify-between items-center ">
                <Link to={`/blog/${blog.id}`} className="text-gray-100 hover:text-green-400 text-lg">
                  {blog.title}
                </Link>
                <div className="text-gray-400 text-sm">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="ml-2 bg-gray-300 text-black p-2 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 mt-4">{blog.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogList;