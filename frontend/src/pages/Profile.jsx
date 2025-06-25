import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("learnhub-token");
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${currentUser._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated!");
      setCurrentUser(res.data.updatedUser);
      localStorage.setItem("learnhub-user", JSON.stringify(res.data.updatedUser));
      setEditing(false);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h4 className="mb-4 text-center">My Profile</h4>
        
        <div className="text-center mb-3">
          <img
            src={currentUser.photoURL || "https://via.placeholder.com/80"}
            className="rounded-circle"
            alt="Profile"
            width="80"
            height="80"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!editing}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            disabled
            className="form-control"
          />
        </div>

        <div className="text-end">
          {editing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

