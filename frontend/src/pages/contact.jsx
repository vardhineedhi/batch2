// ✅ src/pages/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Your email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Query</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
