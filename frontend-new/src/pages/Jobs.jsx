import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
  .get("https://nexhire-z5c2.onrender.com/api/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f4f7fc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        💼 Available Jobs
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <h2 style={{ color: "#1e3a8a" }}>{job.title}</h2>

            <p>
              <strong>💰 Salary:</strong> ₹
              {job.salary?.toLocaleString()}
            </p>

            <p>
              <strong>📌 Type:</strong> {job.jobType}
            </p>

            <p>
              <strong>👥 Openings:</strong> {job.maxPositions}
            </p>

            <button
              onClick={() => alert(`Applied for ${job.title}`)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "15px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Apply Now 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;