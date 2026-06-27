import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

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
      <div
  style={{
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    padding: "35px",
    borderRadius: "24px",
    marginBottom: "30px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "42px",
      marginBottom: "10px",
    }}
  >
    💼 Explore Opportunities
  </h1>

  <p
    style={{
      fontSize: "18px",
      opacity: "0.9",
    }}
  >
    Discover verified jobs from top companies and apply in one click.
  </p>

  <div
    style={{
      marginTop: "20px",
      fontWeight: "600",
    }}
  >
    {jobs.length} Active Jobs Available
  </div>
</div>

<div
  style={{
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search jobs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "100%",
      maxWidth: "600px",
      padding: "16px 20px",
      borderRadius: "14px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      outline: "none",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    }}
  />
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
        }}
      >
        {jobs
  .filter(
    (job) =>
      job.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      job.jobType
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((job) => (
          <div
            key={job._id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "0.3s",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2
  style={{
    color: "#0f172a",
    marginBottom: "15px",
    fontSize: "24px",
  }}
>
  {job.title}
</h2>

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
      background: "#dbeafe",
      color: "#2563eb",
      padding: "6px 12px",
      borderRadius: "999px",
      fontWeight: "600",
      fontSize: "14px",
    }}
  >
    💰 ₹{job.salary?.toLocaleString()}
  </span>

  <span
    style={{
      background: "#dcfce7",
      color: "#16a34a",
      padding: "6px 12px",
      borderRadius: "999px",
      fontWeight: "600",
      fontSize: "14px",
    }}
  >
    📌 {job.jobType}
  </span>
</div>

            <p>
              <strong>👥 Openings:</strong> {job.maxPositions}
            </p>

            <button
              onClick={() => alert(`Applied for ${job.title}`)}
              style={{boxShadow: "0 10px 20px rgba(37,99,235,0.25)",
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
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