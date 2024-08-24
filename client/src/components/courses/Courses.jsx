import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import course1 from "../../assets/courses-images/1.png";
import course2 from "../../assets/courses-images/2.png";
import course3 from "../../assets/courses-images/3.png";
import course4 from "../../assets/courses-images/4.png";
import course5 from "../../assets/courses-images/5.png";
const courses = [
  {
    id: 1,
    name: "Learn About Kafka and Node.js",
    price: 30,
    imageUrl: course1,
  },
  { id: 2, 
    name: "React, but with webpack", 
    price: 20, 
    imageUrl: course2 },
  {
    id: 3,
    name: "Learn About Terraform in Depth",
    price: 20,
    imageUrl: course3,
  },
  {
    id: 4,
    name: "Kubernetes and Docker for deployment",
    price: 30,
    imageUrl: course4,
  },
  {
    id: 5,
    name: "Create your own Serverless web app",
    price: 40,
    imageUrl: course5,
  },
];

const Courses = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("selectedItems");
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handlePayment = async () => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
  
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ items: selectedItems }),
      });
  
      if (response.ok) {
        const { url } = await response.json();
        window.location = url;
      } else if (response.status === 401) {
        // Token might be expired, try refreshing it
        const refreshResponse = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refreshToken })
        });
  
        if (refreshResponse.ok) {
          const { token: newToken } = await refreshResponse.json();
          localStorage.setItem("token", newToken);
  
          // Retry payment with new token
          const retryResponse = await fetch("http://localhost:3000/checkout/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${newToken}`
            },
            body: JSON.stringify({ items: selectedItems }),
          });
  
          if (retryResponse.ok) {
            const { url } = await retryResponse.json();
            window.location = url;
          } else {
            console.error("Retrying payment failed");
          }
        } else {
          console.error("Refresh token failed");
        }
      } else {
        console.error("Payment failed");
        const errorData = await response.json();
        if (errorData.purchasedCourseIds) {
          alert(`You have already purchased courses with IDs: ${errorData.purchasedCourseIds.join(", ")}`);
        } else {
          alert(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  
  
  
  const handleChange = (event) => {
    const { value, checked } = event.target;
    const id = parseInt(value);
    setSelectedItems((prev) =>
      checked
        ? [...prev, { id, quantity: 1 }]
        : prev.filter((item) => item.id !== id)
    );
  };


  return (
    <div className="text-center pt-36">
      <h1 className="text-3xl font-bold text-gray-100 pb-4">
        Our Courses
      </h1>
      <p className="text-gray-300 text-center">
        All that you need to kickstart your career.
      </p>
      <div className="flex flex-wrap justify-center gap-8 py-12 mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col items-stretch rounded overflow-hidden shadow-md shadow-green-300/35 pb-4 bg-[#001313]"
          >
            <img
              className="w-full h-48 object-cover"
              src={course.imageUrl}
              alt={course.name}
            />
            <div className="px-6 py-4 flex-grow">
              <div className="font-bold text-xl mb-2 text-gray-100">
                {course.name}
              </div>
              <div className="flex justify-center items-center gap-2">
                <Link to={`/course-details/${course.id}`}>
                  <button className="border border-green-300 rounded-full hover:bg-green-300 text-white hover:text-gray-900 py-2 px-4 focus:outline-none focus:shadow-outline">
                    Course Details
                  </button>
                </Link>
                <div className="text-gray-200 text-lg border border-green-300 px-4 py-1 rounded-full">
                  ${course.price}
                </div>
              </div>
            </div>
            <div className="px-1 py-2 bg-green-300 w-1/2 rounded-sm flex items-center justify-center mx-auto">
              <label className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 form-checkbox"
                  value={course.id}
                  onChange={handleChange}
                  checked={selectedItems.some((item) => item.id === course.id)}
                />
                <span className="ml-2 text-gray-700">Select the course</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePayment}
        className="border border-green-300 rounded-full hover:bg-green-300 text-white hover:text-gray-900 font-bold py-2 px-8 focus:outline-none focus:shadow-outline mt-4"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Courses;
