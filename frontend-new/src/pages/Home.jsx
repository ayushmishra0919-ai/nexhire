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
          Discover verified opportunities from leading companies,
          connect directly with recruiters, and accelerate your career
          with India's next-generation hiring platform.
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
    gap: "20px",
    marginTop: "35px",
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      background: "rgba(255,255,255,0.12)",
      padding: "18px 30px",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      minWidth: "160px",
    }}
  >
    <h2 style={{ margin: 0, color: "#fff" }}>500+</h2>
    <p style={{ margin: "5px 0 0", color: "#e2e8f0" }}>
      Active Jobs
    </p>
  </div>

  <div
    style={{
      background: "rgba(255,255,255,0.12)",
      padding: "18px 30px",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      minWidth: "160px",
    }}
  >
    <h2 style={{ margin: 0, color: "#fff" }}>100+</h2>
    <p style={{ margin: "5px 0 0", color: "#e2e8f0" }}>
      Companies
    </p>
  </div>

  <div
    style={{
      background: "rgba(255,255,255,0.12)",
      padding: "18px 30px",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      minWidth: "160px",
    }}
  >
    <h2 style={{ margin: 0, color: "#fff" }}>1000+</h2>
    <p style={{ margin: "5px 0 0", color: "#e2e8f0" }}>
      Candidates
    </p>
  </div>
</div>
      </section>

      <section
        style={{
          background: "#ffffff",
          padding: "25px 20px",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "20px",
            letterSpacing: "1px",
          }}
        >
          TRUSTED BY LEADING COMPANIES
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            fontSize: "20px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          <span>Google</span>
          <span>Microsoft</span>
          <span>Amazon</span>
          <span>Adobe</span>
          <span>TCS</span>
        </div>
      </section>

      <section
        style={{
          padding: "50px",
          textAlign: "center",
          background: "#f8fafc",
        }}
      >
        <>
  <h2
    style={{
      fontSize: "2.5rem",
      color: "#0f172a",
      marginBottom: "10px",
    }}
  >
    Why Choose NexHire?
  </h2>

  <p
    style={{
      color: "#64748b",
      maxWidth: "700px",
      margin: "0 auto 40px",
      lineHeight: "1.7",
    }}
  >
    Empowering job seekers and recruiters with a faster,
    smarter, and more reliable hiring experience.
  </p>
</>

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
  <h3>⚡ AI-Powered Matching</h3>
  <p>
    Smart job recommendations based on skills, experience, and career goals.
  </p>
</div>

<div className="card">
  <h3>🏢 Verified Companies</h3>
  <p>
    Apply confidently to trusted employers and verified recruiters.
  </p>
</div>

<div className="card">
  <h3>🔒 Secure & Reliable</h3>
  <p>
    Protected authentication, secure profiles, and reliable job applications.
  </p>
</div>
        </div>
      </section>

      <section
  style={{
    textAlign: "center",
    paddingTop: "20px",
  }}
>
  <h2
    style={{
      fontSize: "2.5rem",
      color: "#0f172a",
      marginBottom: "10px",
    }}
  >
    Featured Jobs
  </h2>

  <p
    style={{
      color: "#64748b",
      maxWidth: "700px",
      margin: "0 auto",
    }}
  >
    Explore the latest opportunities from top companies
    and find the role that matches your skills.
  </p>
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

  <p
    style={{
      color: "#2563eb",
      fontWeight: "600",
      marginBottom: "15px",
    }}
  >
    🏢 {job.company}
  </p>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "15px",
    }}
  >
    <span
      style={{
        background: "#eff6ff",
        color: "#2563eb",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      📍 {job.location}
    </span>

    <span
      style={{
        background: "#ecfdf5",
        color: "#059669",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      💰 {job.salary}
    </span>
  </div>

  <p style={{ color: "#64748b" }}>
    {job.type}
  </p>

  <button onClick={() => setSelectedJob(job)}>
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
              <strong>Company:</strong> {selectedJob.company}
            </p>

            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>

            <p>
              <strong>Salary:</strong> {selectedJob.salary}
            </p>

            <p>
              <strong>Type:</strong> {selectedJob.type}
            </p>

            <button
              onClick={() =>
                alert("Application Submitted!")
              }
            >
              Apply
            </button>

            <button
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <h3>NexHire</h3>

        <p>
          Helping students and professionals find better careers.
        </p>

        <p>© 2026 NexHire. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;