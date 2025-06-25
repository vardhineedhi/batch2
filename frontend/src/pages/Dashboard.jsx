// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     C_title: "",
//     C_description: "",
//     C_categories: "",
//     C_price: "",
//   });

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//     } else if (currentUser.role === "student") {
//       navigate("/courses");
//     } else if (currentUser.role === "admin") {
//       navigate("/admin/dashboard");
//     }
//     // If teacher, stay here
//   }, [currentUser, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/courses/add",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//         }
//       );
//       alert("✅ Course added successfully!");
//       setFormData({
//         C_title: "",
//         C_description: "",
//         C_categories: "",
//         C_price: "",
//       });
//     } catch (err) {
//       alert("❌ Failed to add course. You may not be a teacher.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Add New Course (Teacher)</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="C_title"
//           placeholder="Course Title"
//           className="form-control mb-2"
//           onChange={handleChange}
//           value={formData.C_title}
//         />
//         <input
//           type="text"
//           name="C_categories"
//           placeholder="Category (e.g., Web Development)"
//           className="form-control mb-2"
//           onChange={handleChange}
//           value={formData.C_categories}
//         />
//         <textarea
//           name="C_description"
//           placeholder="Course Description"
//           className="form-control mb-2"
//           onChange={handleChange}
//           value={formData.C_description}
//         ></textarea>
//         <input
//           type="number"
//           name="C_price"
//           placeholder="Price"
//           className="form-control mb-3"
//           onChange={handleChange}
//           value={formData.C_price}
//         />
//         <button className="btn btn-primary w-100">Add Course</button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    C_title: "",
    C_description: "",
    C_categories: "",
    C_price: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.C_title || !formData.C_description || !formData.C_categories || !formData.C_price) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/courses/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      toast.success("Course added successfully!");

      setFormData({
        C_title: "",
        C_description: "",
        C_categories: "",
        C_price: "",
      });
    } catch (err) {
      toast.error("Failed to add course. You must be a teacher.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📚 Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="C_title"
            placeholder="Course Title"
            className="form-control mb-3"
            onChange={handleChange}
            value={formData.C_title}
          />

          <input
            type="text"
            name="C_categories"
            placeholder="Category (e.g., Web Dev)"
            className="form-control mb-3"
            onChange={handleChange}
            value={formData.C_categories}
          />

          <textarea
            name="C_description"
            placeholder="Course Description"
            className="form-control mb-3"
            onChange={handleChange}
            value={formData.C_description}
          ></textarea>

          <input
            type="number"
            name="C_price"
            placeholder="Course Price"
            className="form-control mb-3"
            onChange={handleChange}
            value={formData.C_price}
          />

          <button type="submit" className="btn btn-primary w-100">
            ➕ Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
