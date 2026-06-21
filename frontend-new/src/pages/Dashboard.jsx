import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        padding: "40px",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>
        🚀 NexHire Dashboard
      </h1>

      <p style={{ fontSize: "18px" }}>
        Welcome back, Ayush! Manage jobs and applications easily.
      </p>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            color: "#111",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>💼 12</h2>
          <p>Total Jobs</p>
        </div>

        <div
          style={{
            background: "#ffffff",
            color: "#111",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>👨‍💼 48</h2>
          <p>Applicants</p>
        </div>

        <div
          style={{
            background: "#ffffff",
            color: "#111",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>📢 5</h2>
          <p>Jobs Posted</p>
        </div>

        <div
          style={{
            background: "#ffffff",
            color: "#111",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>⭐ 95%</h2>
          <p>Profile Completion</p>
        </div>
      </div>

      {/* Action Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <div
          onClick={() => navigate("/jobs")}
          style={{
            background: "white",
            color: "#111",
            padding: "30px",
            borderRadius: "15px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <h2>💼 Jobs</h2>
          <p>Browse Available Jobs</p>
        </div>

        <div
          onClick={() => navigate("/profile")}
          style={{
            background: "white",
            color: "#111",
            padding: "30px",
            borderRadius: "15px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <h2>👤 Profile</h2>
          <p>Manage Your Profile</p>
        </div>

        <div
          onClick={() => navigate("/post-job")}
          style={{
            background: "white",
            color: "#111",
            padding: "30px",
            borderRadius: "15px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <h2>📢 Post Job</h2>
          <p>Create New Jobs</p>
        </div>

        <div
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <h2>🚪 Logout</h2>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;