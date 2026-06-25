import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "₹12 LPA",
      type: "Full Time",
    },
    {
      title: "React Developer",
      company: "Amazon",
      location: "Remote",
      salary: "₹15 LPA",
      type: "Remote",
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "₹18 LPA",
      type: "Full Time",
    },
    {
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Pune",
      salary: "₹10 LPA",
      type: "Full Time",
    },
    {
      title: "Data Analyst",
      company: "TCS",
      location: "Noida",
      salary: "₹8 LPA",
      type: "Hybrid",
    },
  ];

  return (
    <div>
      <section className="hero">
        <h1>
          Find Your Dream Job With India's Smartest Job Portal 🚀
        </h1>

        <p>
          Connect with top recruiters, discover high-paying jobs,
          and build your career with confidence.
        </p>

        <input
          type="text"
          placeholder="Search jobs..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <br />
        <br />

        <button
  className="hero-btn"
  onClick={() => navigate("/jobs")}
>
  Explore Jobs
</button>

        <p style={{ marginTop: "20px", color: "white" }}>
          {jobs.length}+ Active Jobs Available
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
            color: "white",
            fontWeight: "bold",
            flexWrap: "wrap",
          }}
        >
          <span>💼 500+ Jobs</span>
          <span>🏢 100+ Companies</span>
          <span>👨‍💻 1000+ Candidates</span>
        </div>
      </section>

      <section
        style={{
          padding: "50px",
          textAlign: "center",
          background: "#f8fafc",
        }}
      >
        <h2>Why Choose NexHire?</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div className="card">
            <h3>🚀 Fast Hiring</h3>
            <p>
              Connect recruiters and candidates instantly.
            </p>
          </div>

          <div className="card">
            <h3>💼 Premium Jobs</h3>
            <p>
              Discover jobs from top companies.
            </p>
          </div>

          <div className="card">
            <h3>🔒 Secure Platform</h3>
            <p>
              Safe authentication and protected routes.
            </p>
          </div>
        </div>
      </section>

      <section className="jobs">
        {jobs
          .filter(
            (job) =>
              job.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              job.company
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              job.location
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((job, index) => (
            <div key={index} className="card">
              <h3>{job.title}</h3>

              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <p>
                <strong>Type:</strong> {job.type}
              </p>

              <button
                onClick={() => setSelectedJob(job)}
              >
                View Details
              </button>
            </div>
          ))}
      </section>

      {selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedJob.title}</h2>

            <p>
              <strong>Company:</strong>{" "}
              {selectedJob.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedJob.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {selectedJob.salary}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedJob.type}
            </p>

            <button
              onClick={() =>
                alert("Application Submitted!")
              }
            >
              Apply
            </button>

            <button
              onClick={() =>
                setSelectedJob(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <h3>NexHire</h3>

        <p>
          Helping students and professionals find
          better careers.
        </p>

        <p>© 2026 NexHire. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;