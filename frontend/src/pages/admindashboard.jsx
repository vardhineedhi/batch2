import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCourse, setNewCourse] = useState({
  C_title: "c progrmming laguauge",
  C_description: "c languauge is bacis foundation language it is discovered by dennis riche .",
  C_price: "Free",
  C_categories: "programming",
  C_video: "https://www.youtube.com/watch?v=xND0t1pr3KY",
  C_certificate: false,

  // "C_title": "Full Stack Development",
  // "C_description": "Learn full stack from scratch.",
  // "C_price": 999,
  // "C_categories": "Web Development",
  // "C_video": "https://www.example.com/intro.mp4",
  // "C_certificate": true

});

  useEffect(() => {
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "teacher")) {
  navigate("/login");
  return;
}


    const fetchData = async () => {
      try {
        const courseRes = await axios.get("http://localhost:5000/api/courses/add");
        const userRes = await axios.get("http://localhost:5000/api/users/all", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setCourses(courseRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  return (
    <div className="container mt-5">
      <h2>📊 Admin Dashboard</h2>
      <h4 className="mt-4">Add New Course</h4>
<form
  onSubmit={async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/courses/add", newCourse, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      alert("Course added successfully!");
      setCourses((prev) => [...prev, res.data]);
      setNewCourse({
        C_title: "",
        C_description: "",
        C_price: "",
        C_categories: "",
        C_video: "",
        C_certificate: false,
      });
    } catch (err) {
      console.error("Error adding course:", err);
    }
  }}
>
  <div className="mb-3">
    <input
      type="text"
      placeholder="Course Title"
      className="form-control"
      value={newCourse.C_title}
      onChange={(e) => setNewCourse({ ...newCourse, C_title: e.target.value })}
      required
    />
  </div>
  <div className="mb-3">
    <textarea
      placeholder="Course Description"
      className="form-control"
      value={newCourse.C_description}
      onChange={(e) => setNewCourse({ ...newCourse, C_description: e.target.value })}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="number"
      placeholder="Price"
      className="form-control"
      value={newCourse.C_price}
      onChange={(e) => setNewCourse({ ...newCourse, C_price: e.target.value })}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      placeholder="Categories"
      className="form-control"
      value={newCourse.C_categories}
      onChange={(e) => setNewCourse({ ...newCourse, C_categories: e.target.value })}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      placeholder="Video URL (optional)"
      className="form-control"
      value={newCourse.C_video}
      onChange={(e) => setNewCourse({ ...newCourse, C_video: e.target.value })}
    />
  </div>
  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="certificateCheckbox"
      checked={newCourse.C_certificate}
      onChange={(e) => setNewCourse({ ...newCourse, C_certificate: e.target.checked })}
    />
    <label className="form-check-label" htmlFor="certificateCheckbox">
      Includes Certificate
    </label>
  </div>
  <button type="submit" className="btn btn-success">Add Course</button>
</form>

      <h4 className="mt-4">All Courses ({courses.length})</h4>
      <ul className="list-group mb-4">
  {courses.map((course) => (
    <li
      key={course._id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>{course.C_title} - ₹{course.C_price}</span>

      {/* ✅ Show delete only to admin */}
      {currentUser.role === "admin" && (
        <button
          className="btn btn-danger btn-sm"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this course?")) {
              try {
                await axios.delete(`http://localhost:5000/api/courses/${course._id}`, {
                  headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                  },
                });
                setCourses((prev) => prev.filter((c) => c._id !== course._id));
              } catch (err) {
                console.error("Failed to delete course:", err);
              }
            }
          }}
        >
          Delete
        </button>
      )}
    </li>
  ))}
</ul>


      <h4>All Users ({users.length})</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item">
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
