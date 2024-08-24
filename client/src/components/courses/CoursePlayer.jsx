import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [videoId, setVideoId] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/course-content/course-content/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setVideoId(response.data.vimeoVideoId);
        setCourseDetails(response.data);
      } catch (error) {
        setError('Error fetching course details');
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 md:p-4 flex flex-col items-center justify-center">
      <div className='pt-24'>
      {videoId ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          width="850"
          height="450"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Vimeo Video"
          className="my-4"
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
      {courseDetails.name && (
        <div className="w-full max-w-4xl bg-[#001313] bg-style  p-8 mt-8 shadow-sm shadow-green-300 md:px-8 rounded-2xl md:py-8 hover:shadow-green-300">
          <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">{courseDetails.name}</h1>
          {courseDetails.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-2">Description:</h3>
              <p className="text-gray-300">{courseDetails.description}</p>
            </div>
          )}
          {courseDetails.syllabus && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-2">Syllabus:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {courseDetails.syllabus.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {courseDetails.instructor_bio && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-2">Instructor Bio:</h3>
              <p className="text-gray-300">{courseDetails.instructor_bio}</p>
            </div>
          )}
          {courseDetails.testimonials && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-2">Testimonials:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {courseDetails.testimonials.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default CoursePlayer;