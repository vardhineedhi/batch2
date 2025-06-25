import React from "react";
import { Link } from "react-router-dom";
// import "./Home.css"; // optional: use this to style more

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold display-5">
                Explore Our <span className="text-primary">14000+</span><br />
                Online courses for all
              </h1>
              <p className="lead mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit tempor ut labore
              </p>
              <div className="d-flex mb-4">
                <input
                  type="text"
                  placeholder="Search Your Course Here..."
                  className="form-control me-2"
                />
                <button className="btn btn-primary">Search 🔍</button>
              </div>
              <div className="d-flex gap-4">
                <div className="bg-light text-dark p-3 rounded shadow-sm text-center">
                  <h5>684+</h5>
                  <small>Certified Students</small>
                </div>
                <div className="bg-light text-dark p-3 rounded shadow-sm text-center">
                  <h5>4,500+</h5>
                  <small>Active Students</small>
                </div>
              </div>
            </div>
          <div className="col-md-6 text-center mt-4 mt-md-0 d-flex justify-content-center">
  <img
    src="/hero-girl.png"
    alt="student"
    className="img-fluid hero-img"
    style={{
      maxHeight: "400px",
      objectFit: "cover",
      borderRadius: "10px"
    }}
  />
</div>
 
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4"> 📚 Our Courses</h2>
          <p className="text-center mb-5">
            Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert,
            we have something for everyone.
          </p>
          <div className="row g-4">
            {[
              {
                title: "SQL QUERIES USING PYTHON",
                subtitle: "SQL QUEIRES IMPLEMENTED BY USING PYTHON",
                img: "/course1.png",
              },
              {
                title: "MS-EXCEL TRICKS",
                subtitle: "IN THIS YOU LEARN SOME SIMPLE TRICKS USED IN  MS EXCEL",
                img: "/course2.png",
              },
              {
                title: "HTML Full Course",
                subtitle: "Hey this is the subtitle for the html course",
                img: "/course3.png",
              },
            ].map((course, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 shadow-sm">
                  <img src={course.img} className="card-img-top" alt={course.title} />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.subtitle}</p>
                    <Link to="/courses" className="btn btn-dark">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;





