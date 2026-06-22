import { useState } from "react";
import axios from "axios";

function PostJob() {
const [title, setTitle] = useState("");
const [salary, setSalary] = useState("");
const [duration, setDuration] = useState("");
const [maxApplicants, setMaxApplicants] = useState("");
const [maxPositions, setMaxPositions] = useState("");
const [deadline, setDeadline] = useState("");
const [skillsets, setSkillsets] = useState("");

const postJob = async () => {
try {
const token = localStorage.getItem("token");


  await axios.post(
    "https://nexhire-z5c2.onrender.com/api/jobs",
    {
      title,
      salary: Number(salary),
      duration: Number(duration),
      maxApplicants: Number(maxApplicants),
      maxPositions: Number(maxPositions),
      deadline,
      skillsets: skillsets.split(","),
      jobType: "Full Time",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("✅ Job Posted Successfully!");
} catch (err) {
  console.log(err);
  alert("❌ Failed to Post Job");
}


};

return (
<div
style={{
minHeight: "100vh",
background: "#f4f7fc",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "40px",
}}
>
<div
style={{
background: "white",
padding: "35px",
width: "650px",
borderRadius: "18px",
boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
}}
>
<h1
style={{
textAlign: "center",
color: "#1e3a8a",
marginBottom: "25px",
}}
>
🚀 Post New Job </h1>


    <input
      placeholder="Job Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Salary (₹)"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Duration (Months)"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Maximum Applicants"
      value={maxApplicants}
      onChange={(e) => setMaxApplicants(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Maximum Positions"
      value={maxPositions}
      onChange={(e) => setMaxPositions(e.target.value)}
      style={inputStyle}
    />

    <input
      type="date"
      value={deadline}
      onChange={(e) => setDeadline(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Skills (React, Node, MongoDB)"
      value={skillsets}
      onChange={(e) => setSkillsets(e.target.value)}
      style={inputStyle}
    />

    <button
      onClick={postJob}
      style={{
        width: "100%",
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "14px",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "15px",
      }}
    >
      Post Job
    </button>
  </div>
</div>


);
}

const inputStyle = {
width: "100%",
padding: "12px",
marginBottom: "15px",
border: "1px solid #d1d5db",
borderRadius: "8px",
fontSize: "15px",
};

export default PostJob;
