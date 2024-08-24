import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Blog = () => {
  const { blogId } = useParams();
  const [content, setContent] = useState('');
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const markdownModule = await import(`../../blogs/${blogId}.md`);
        
        // Accessing the html property
        const htmlContent = markdownModule.html || '';
        setContent(htmlContent);
        
        // Accessing the attributes
        setAttributes(markdownModule.attributes || {});
      } catch (err) {
        console.error('Error fetching the blog:', err);
      }
    };

    loadMarkdown();
  }, [blogId]);

  return (
    <div className="blog-content w-full">
      <div className="container mx-auto">
        <div className="py-32 flex justify-center items-center w-full">
          <div className="bg-[#001313] flex flex-col justify-center items-center shadow-sm shadow-green-300 md:px-8 rounded-2xl md:py-8 hover:shadow-green-300 p-4 w-full">
            <h1 className="text-white text-center text-3xl font-bold mb-4">{attributes.title}</h1>
            <p className="text-gray-300">{attributes.description}</p>
            <div className="markdown-body text-white max-w-full">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
