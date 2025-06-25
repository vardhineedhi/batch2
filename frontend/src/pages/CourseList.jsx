import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "student") {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [currentUser, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 Browse Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.C_title}</h5>
                <p className="card-text">{course.C_description}</p>
                <p><strong>Category:</strong> {course.C_categories}</p>
                <p><strong>Price:</strong> ₹{course.C_price}</p>

                {/* Optional: Display course video */}
                {course.C_video && (
                  <video
                    src={course.C_video}
                    controls
                    className="w-100 mb-2"
                    style={{ borderRadius: "8px" }}
                  />
                )}

                {/* Optional: Certificate availability */}
                {course.C_certificate ? (
                  <span className="badge bg-success mb-2">🎓 Certificate Included</span>
                ) : (
                  <span className="badge bg-secondary mb-2">No Certificate</span>
                )}

                <button className="btn btn-primary w-100">Enroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

