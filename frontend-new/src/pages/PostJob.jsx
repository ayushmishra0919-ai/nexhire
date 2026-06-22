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

      alert("Job Posted Successfully!");
    } catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  alert("Failed to Post Job");
}
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Post New Job</h1>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Max Applicants"
        value={maxApplicants}
        onChange={(e) => setMaxApplicants(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Max Positions"
        value={maxPositions}
        onChange={(e) => setMaxPositions(e.target.value)}
      />
      <br />
      <br />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Skills (React,Node,MongoDB)"
        value={skillsets}
        onChange={(e) => setSkillsets(e.target.value)}
      />
      <br />
      <br />

      <button onClick={postJob}>Post Job</button>
    </div>
  );
}

export default PostJob;