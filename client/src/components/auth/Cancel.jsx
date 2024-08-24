// src/Cancel.js
import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center py-36 bg-[#1b1a1a] px-4">
    <h1 className="text-3xl my-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">No Purchase Yet!</h1>
    <p className='mb-4 text-gray-200'>You just unlocked the cancel Route</p>
    <div className="w-full flex justify-center items-center">
    <iframe src="https://giphy.com/embed/a9xhxAxaqOfQs" width="480" height="264" class="giphy-embed" className='my-6' allowFullScreen></iframe>
    </div>
    <Link to="/courses" className="px-4 py-2 block w-full rounded-full border border-green-300 text-sm font-medium text-white hover:text-black hover:bg-green-300 focus:outline-none focus:ring sm:w-auto">Buy A Course?</Link>
      
  </div>
  );
};

export default Cancel;
